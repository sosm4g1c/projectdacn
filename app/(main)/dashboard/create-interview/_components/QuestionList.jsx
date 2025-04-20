import axios from "axios";
import { ArrowRight, Loader2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "../../../../../components/ui/button";
import QuestionListContainer from "./QuestionListContainer";
import { useUser } from "../../../../provider";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "../../../../../services/supabaseClient";
import { Loader2 } from "lucide-react";

function QuestionList({ formData , onCreateLink}) {
  const [loading, setLoading] = useState(true);
  const [questionList, setQuestionList] = useState([]);
  const { user } = useUser();
  const [saveLoading, setSaveLoading] = useState(false);
  useEffect(() => {
    if (formData) {
      GenerateQuestionList();
    }
  }, [formData]);

  const GenerateQuestionList = async () => {
    setLoading(true);
    try {
      const result = await axios.post("/api/ai-model", {
        ...formData,
      });
      const Content = result.data.content;
      const match = Content.match(
        /```json[\s\S]*?interviewQuestions\s*=\s*(\[[\s\S]*?\])[\s\S]*?```/
      );

      if (match && match[1]) {
        try {
          const parsed = JSON.parse(match[1]); // Chuyển đổi chuỗi JSON thành object
          setQuestionList(parsed);
        } catch (e) {
          console.error("Lỗi parse JSON:", e);
        }
      }
      setLoading(false);
    } catch (error) {
      toast("Server Error, Try again!");
      setLoading(false);
    }
  };

  const onFinish = async () => {
    setSaveLoading(true);
    const interview_id = uuidv4();
    const { data, error } = await supabase
      .from("Interviews")
      .insert([
        {
          ...formData,
          questionList: questionList,
          userEmail: user?.email,
          interview_id: interview_id,
        },
      ])
      .select();
    setSaveLoading(false);
    onCreateLink(interview_id);
    // console.log("data", data);
  };

  return (
    <div>
      {loading && (
        <div className="p-5 bg-blue-100 rounded-xl border border-primary flex gap-5 items-center">
          <Loader2Icon className="animate-spin" />
          <div>
            <h2 className="text-primary font-medium">
              {" "}
              Đang tạo câu hỏi phỏng vấn cho bạn
            </h2>
            <p className="text-primary">
            AI của chúng tôi đang tạo ra những câu hỏi phỏng vấn phù hợp dựa trên vị trí công việc bạn cung cấp.
            </p>
          </div>
        </div>
      )}

      {Array.isArray(questionList) && questionList.length > 0 && (
        <div className="p-5 mt-6 border border-gray-300 rounded-xl bg-white shadow-sm">
          <QuestionListContainer questionList={questionList} />
        </div>
      )}
      {!loading && Array.isArray(questionList) && questionList.length > 0 && (
        <div className="flex justify-end mt-10 items-center">
          <Button onClick={() => onFinish()} disabled={saveLoading}>
            {saveLoading && <Loader2 className="animate-spin" />}
            Khởi tạo liên kết phỏng vấn <ArrowRight className="w-2 h-2 ml-1 " />
            
          </Button>
        </div>
      )}
    </div>
  );
}

export default QuestionList;
