"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { supabase } from "../../../../../services/supabaseClient";
import { useUser } from "../../../../provider";
import InterviewDetailContainer from "./_components/InterviewDetailContainer";
import CadidateList from "./_components/CandidateList";
import { Button } from "../../../../../components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";


function InterviewDetail() {
  const { interview_id } = useParams();
  const router = useRouter();

  const { user } = useUser();
  const [interviewDetail, setInterviewDetail] = useState();

  useEffect(() => {
    user && GetInterviewDetail();
  }, [user]);

  const GetInterviewDetail = async () => {
    const result = await supabase
      .from("Interviews")
      .select(
        "jobPosition,jobDescription,type,questionList, duration, interview_id,created_at, interview-feedback(userEmail, userName, feedback,created_at)"
      )
      .eq("userEmail", user?.email)
      .eq("interview_id", interview_id);

    setInterviewDetail(result?.data[0]);
    console.log(result);
  };
  return (
    <div className="">
      
      <h2 className="font-bold text-2xl"> <Button size="icon" onClick={() => router.back()}><ArrowLeft className="w-4 h-4"/></Button> Chi Tiết Buổi Phỏng Vấn</h2>   
      <InterviewDetailContainer interviewDetail={interviewDetail}/>
      <CadidateList candidateList={interviewDetail?.['interview-feedback']}/>
    </div>
  );
}

export default InterviewDetail;
