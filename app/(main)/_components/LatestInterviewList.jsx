"use client";
import React, { useEffect, useState } from "react";
import { Video } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { supabase } from "../../../services/supabaseClient";
import { useUser } from "../../provider";
import InterviewCard from "./InterviewCard";
import { toast } from "sonner";


function LatestInterViewList() {
  const [interviewList, setInterviewList] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    user && GetInterviewList();
  }, [user]);

  const GetInterviewList = async () => {
    let { data: Interviews, error } = await supabase
      .from("Interviews")
      .select("*, interview-feedback(feedback)")
      .eq("userEmail", user?.email)
      .order('id', { ascending: false })
      .limit(6);
    console.log(Interviews);
    setInterviewList(Interviews);
  };

  return (
    <div className="my-5">
      <h2 className="font-bold text-xl">Các Buổi Phỏng Vấn Đã Tạo Trước Đó</h2>
      {interviewList?.length == 0 && (
        <div className="p-5 flex flex-col gap-3 items-center mt-5 bg-white">
          <Video className="h-10 w-10 text-primary" />
          <h2>Bạn chưa tạo bất kỳ buổi phỏng vấn nào!</h2>
          <Button>+ Tạo Phỏng Vấn</Button>
        </div>
      )}

      {interviewList && 
      <div className="grid grid-cols-2 xl:grid-cols-3 gap-5 mt-5">
        {
          interviewList.map((interview, index) => (
            <InterviewCard interview={interview} key={index} />
          ))
        }
      </div>
      }

    </div>
  );
}

export default LatestInterViewList;
