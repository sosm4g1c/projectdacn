"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { Clock, Info, Loader2Icon, Video } from "lucide-react";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "../../../services/supabaseClient";
import { toast } from "sonner";
import { InterviewDataContext } from "../../../context/InterviewDataContext";

function Interview() {
  const { interview_id } = useParams();
  console.log(interview_id);
  const [interviewData, setInterviewData] = useState();
  const [userName, setUserName] = useState();
  const [userEmail, setUserEmail] = useState();
  const [loading, setLoading] = useState(false);
  const {interviewInfo, setInterviewInfo} = useContext(InterviewDataContext);
  const router = useRouter();

  useEffect(() => {
    interview_id && GetInterviewDetails();
  }, [interview_id]);

  const GetInterviewDetails = async () => {
    setLoading(true);
    try {
      let { data: Interviews, error } = await supabase
        .from("Interviews")
        .select("jobPosition, jobDescription, duration, type")
        .eq("interview_id", interview_id);

      setInterviewData(Interviews[0]);
      if (Interviews?.length == 0) {
        return toast.error("incorrect interview link");
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
      toast.error("incorrect interview link");
    }
    // console.log(Interviews);
  };

  const onJoinInterview = async () => {
    setLoading(true);
    let { data: Interviews, error } = await supabase
      .from("Interviews")
      .select("*")
      .eq("interview_id", interview_id);
    console.log(Interviews[0]);
    setInterviewInfo({
      userName: userName,
      userEmail: userEmail,
      interviewData: Interviews[0],
    });
    router.push(`/interview/${interview_id}/start`);
    setLoading(false);
  };

  return (
    <div className="px-10 md:px-28 lg:px-40 xl:px-80 mt-8 ">
      <div className="flex flex-col items-center justify-center border rounded-lg bg-white p-7 lg:px-32 xl:px-52 mb-20">
        <Image
          src={"/logo.png"}
          alt="logo"
          width={100}
          height={100}
          className="w-[140px]"
        />
        <h2 className="mt-3">Nền tảng phỏng vấn với AI</h2>
        <Image
          src={"/interview.jpg"}
          alt="interview"
          width={500}
          height={500}
          className="w-[280px] my-6"
        />
        <h2 className="font-bold text-xl mt-3">Vị trí công việc: {interviewData?.jobPosition}</h2>
        <h2 className="flex gap-2 items-center text-gray-500 mt-3">
          <Clock className="h-4 w-4" /> Thời gian: <span className="font-bold">{interviewData?.duration}</span> 
        </h2>
        <div className="w-full">
          <h2  className="mb-1">Họ và Tên <span className="text-red-800">*</span></h2>
          <Input
            placeholder="Nhập họ và tên của bạn ..."
            onChange={(e) => setUserName(e.target.value)
             
            }
          />
        </div>
        <div className="w-full mt-3 mb-11">
          <h2> Email <span className="text-red-800">*</span></h2>
          <Input
            placeholder="Nhập email của bạn ..."
            type="email"
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </div>



        <div className="p-3 bg-blue-100 flex gap-4 rounded-lg mt-2">
          <Info className="text-primary" />
          <div>
            <h2 className="font-bold text-blue-500">Trước khi bắt đầu phỏng vấn</h2>
            <ul className="">
              <li className="text-sm text-primary">
                - Kiểm tra microphone và camera của bạn
              </li>
              <li className="text-sm text-primary">
                - Đảm bảo bạn có kết nối internet ổn định
              </li>
              <li className="text-sm text-primary">
                - Đảm bảo bạn đang ở nơi yên tĩnh và không bị làm phiền
              </li>
            </ul>
          </div>
        </div>
        <Button
          className={"mt-5 w-full font-bold"}
          disabled={loading || !userName || !userEmail}
          onClick={() => onJoinInterview()}
        >
          <Video /> {loading && <Loader2Icon />}
          Tham gia phỏng vấn
        </Button>
      </div>
    </div>
  );
}

export default Interview;
