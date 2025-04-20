"use client";
import React from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Progress } from "../../../../components/ui/progress";
import { useState } from "react";
import { toast } from "sonner";
import QuestionList from "./_components/QuestionList";
import FormContainer from "./_components/FormContainer";
import InterviewLink from "./_components/InterviewLink";


function CreateInterview() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState();
  const [interviewId, setInterviewId] = useState();
  const [interviewQuestionList, setInterviewQuestionList] = useState([]);

  const onHandleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // console.log("formData", formData, value);
  };

  const onGoToNext = () => {
    if (
      !formData?.jobPosition ||
      !formData?.jobDescription ||
      !formData?.duration ||
      !formData?.type
    ) {
      toast.warning("Please enter all details");
      return;
    }
    setStep(step + 1);
  };
  const onCreateLink = (interview_id) => {
    setInterviewId(interview_id);
    setStep(step + 1);
  };
  
  const GetInterviewQuestionList = async () => {
    const result = await supabase
      .from("Interviews")
      .select(
        "questionList"
      )
      .eq("userEmail", user?.email)
      .order("id", { ascending: false });
    // console.log(result.data);
    setInterviewQuestionList(result.data);
  };

  return (
    <div className="px-10 md:px-24 lg:px-44 xl:px-56">
      <div className="flex gap-5 items-center">
        <ArrowLeft onClick={() => router.back()} className="cursor-pointer" />
        <h2 className="font-bold text-2xl">Tạo Phỏng Vấn</h2>
      </div>
      <Progress value={step * 33.33} className={"my-5"} />
      {step == 1 ? (
        <FormContainer
          onHandleInputChange={onHandleInputChange}
          GoToNext={() => onGoToNext()}
        />
      ) : step == 2 ? (
        <QuestionList
          formData={formData}
          onCreateLink={(interview_id) => onCreateLink(interview_id)}
        />
      ) : step == 3 ? (
        <InterviewLink interview_id={interviewId} formData={formData} />
      ) : null}
    </div>
  );
}

export default CreateInterview;
