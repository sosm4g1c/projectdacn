"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "../../../services/supabaseClient";
import { useUser } from "../../provider";
import { Video } from "lucide-react";
import { Button } from "../../../components/ui/button";
import InterviewCard from "../_components/InterviewCard";

function ScheduledInterview() {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState([]);
  useEffect(() => {
    user && GetInterviewList();
  }, [user]);

  const GetInterviewList = async () => {
    const result = await supabase
      .from("Interviews")
      .select(
        "jobPosition, duration, interview_id, interview-feedback(userEmail)"
      )
      .eq("userEmail", user?.email)
      .order("id", { ascending: false });
    // console.log(result.data[0]?.['interview-feedback'].length);

    // Mảng để lưu trữ các cuộc phỏng vấn có ít nhất một ứng viên
    const filteredInterviews = [];

    // Duyệt qua mỗi phần tử trong mảng data
    for (let i = 0; i < result.data.length; i++) {
      if (result.data[i]?.["interview-feedback"]?.length > 0) {
        filteredInterviews.push(result.data[i]);
      }
    }
    // console.log(filteredInterviews);
    
    setInterviewList(filteredInterviews);
  };

  return (
    <div className="mt-5">
      <h2 className="font-bold text-2xl">Các Buổi Phỏng Vấn Đã Có Đánh Giá</h2>

      {interviewList?.length == 0 && (
        <div className="p-5 flex flex-col gap-3 items-center mt-5 bg-white">
          <Video className="h-10 w-10 text-primary" />
          <h2>Bạn chưa tạo bất kỳ buổi phỏng vấn nào!</h2>
          <Button>+ Tạo Buổi Phỏng Vấn Mới</Button>
        </div>
      )}

      {interviewList && (
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-6 mt-5">
          {interviewList.map((interview, index) => (
            <InterviewCard
              interview={interview}
              key={index}
              viewDetail={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ScheduledInterview;
