"use client";
import React, { use, useContext, useEffect, useState } from "react";
import { InterviewDataContext } from "../../../../context/InterviewDataContext";
import { Loader2Icon, Mic, Phone, Timer } from "lucide-react";
import Image from "next/image";
import AlertComfirmation from "./_components/AlertComfirmation";
import Vapi from "@vapi-ai/web";
import { toast } from "sonner";
import axios from "axios";
import { supabase } from "../../../../services/supabaseClient";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import TimerComponent from "./_components/TimerComponent";

function StartInterview() {
  const { interviewInfo, setInterviewInfo } = useContext(InterviewDataContext);
  const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_Key);
  const [activeUser, setActiveUser] = useState(false);
  const { interview_id } = useParams();
  const [conversation, setConversation] = useState();
  const [loading, setLoading] = useState(false);
  const [isRunning, setIsRunning] = useState(true);
  const router = useRouter();
  useEffect(() => {
    interviewInfo && startCall();
  }, [interviewInfo]);

  const startCall = () => {
    let questionList;
    interviewInfo?.interviewData?.questionList.forEach(
      (item, index) => (questionList = item.question + "," + questionList)
    );
    const assistantOptions = {
      name: "Nhà tuyển dụng AI",
      firstMessage:
        "Chào " +
        interviewInfo?.userName +
        ",  bạn khỏe không? Bạn đã sẵn sàng cho buổi phỏng vấn vị trí" +
        interviewInfo?.interviewData?.jobPosition +
        "chưa?",
      transcriber: {
        provider: "deepgram",
        model: "nova-2",
        language: "vi",
      },
      voice: {
        provider: "openai",
        voiceId: "nova",
      },
      model: {
        provider: "openai",
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `
    Bạn là một trợ lý AI đang thực hiện buổi phỏng vấn với ứng viên.

Công việc của bạn là đặt các câu hỏi phỏng vấn được cung cấp và đánh giá câu trả lời từ ứng viên.

Hãy bắt đầu cuộc trò chuyện với lời giới thiệu thân thiện, tạo không khí thoải mái nhưng vẫn chuyên nghiệp. Ví dụ:
"Chào bạn! Chào mừng đến với buổi phỏng vấn vị trí ${interviewInfo?.interviewData?.jobPosition}. Mình sẽ bắt đầu với một vài câu hỏi nhé!"

Hãy đặt từng câu hỏi một và chờ ứng viên trả lời trước khi tiếp tục. Giữ câu hỏi rõ ràng và ngắn gọn.

Dưới đây là danh sách câu hỏi, hãy hỏi lần lượt:
Câu hỏi: ${questionList}

Nếu ứng viên gặp khó khăn, hãy gợi ý hoặc diễn đạt lại câu hỏi theo cách dễ hiểu hơn mà không tiết lộ đáp án. Ví dụ:
"Cần gợi ý không? Hãy nghĩ về cách React theo dõi sự thay đổi trong component!"

Sau mỗi câu trả lời, hãy đưa ra phản hồi ngắn gọn và tích cực. Ví dụ:
"Tốt lắm! Câu trả lời rất ổn."
"Ừm, chưa chính xác lắm! Muốn thử lại không?"

Giữ cho cuộc trò chuyện tự nhiên và hấp dẫn — sử dụng các cụm từ thân thiện như: "Rồi, tiếp theo nào..." hoặc "Giờ đến một câu hơi khoai nhé!"

Sau khoảng 5–7 câu hỏi, hãy kết thúc buổi phỏng vấn một cách nhẹ nhàng bằng cách tổng kết hiệu suất của ứng viên. Ví dụ:
"Bạn đã làm rất tốt! Một số câu hỏi khá khó mà bạn vẫn trả lời tốt. Tiếp tục luyện tập nhé!"

Kết thúc bằng một lời chào tích cực:
"Cảm ơn bạn đã trò chuyện cùng mình! Chúc bạn sớm chinh phục được những dự án tuyệt vời!"

Nguyên tắc chính:
- Thân thiện, tự nhiên và hài hước nhẹ nhàng.
- Câu trả lời ngắn gọn, giống như một cuộc trò chuyện thật sự.
- Linh hoạt tùy theo độ tự tin của ứng viên.
- Đảm bảo buổi phỏng vấn vẫn tập trung vào chủ đề React.
    `.trim(),
          },
        ],
      },
    };
    vapi.start(assistantOptions);
  };

  const stopInterview = () => {
    vapi.stop();
    console.log("Call has ended.");
    GenerateFeedBack();
    setIsRunning(false);
  };

  // vapi.on("call-start", () => {
  //   console.log("Call has started.");
  //   toast.success("Interview has started.");
  // });

  // vapi.on("speech-start", () => {
  //   console.log("Assistant speech has started.");
  //   setActiveUser(false);
  // });
  // vapi.on("speech-end", () => {
  //   console.log("Assistant speech has ended.");
  //   setActiveUser(true);
  // });

  // vapi.on("call-end", () => {
  //   console.log("Call has ended.");
  //   toast("Interview has ended.");
  //   GenerateFeedBack();
  // });

  useEffect(() => {
    const handleMessage = (message) => {
      console.log("Received message:", message);
      if (message?.conversation) {
        const convoString = JSON.stringify(message?.conversation);
        console.log("convoString:", convoString);
        setConversation(convoString);
      }
    };

    const handleCallStart = () => {
      console.log("Call has started.");
      toast.success("Interview has started.");
    };

    const handleSpeechStart = () => {
      console.log("Assistant speech has started.");
      setActiveUser(false);
    };

    const handleSpeechEnd = () => {
      console.log("Assistant speech has ended.");
      setActiveUser(true);
    };

    const handleCallEnd = () => {
      console.log("Call has ended.");
      toast("Interview has ended.");
      GenerateFeedBack();
    };

    vapi.on("call-start", handleCallStart);
    vapi.on("speech-start", handleSpeechStart);
    vapi.on("speech-end", handleSpeechEnd);
    vapi.on("call-end", handleCallEnd);
    vapi.on("message", handleMessage);

    return () => {
      vapi.off("call-start", handleCallStart);
      vapi.off("speech-start", handleSpeechStart);
      vapi.off("speech-end", handleSpeechEnd);
      vapi.off("call-end", handleCallEnd);
      vapi.off("message", handleMessage);
    };
  }, []);

  const GenerateFeedBack = async () => {
    setLoading(true);
    const result = await axios.post("/api/ai-feedback", {
      conversation: conversation,
    });
    console.log(result?.data);
    const Content = result?.data?.content;
    // const FINAL_CONTENT = Content.replace(/\\n/g, "\n").replace(/\\'/g, "'");
    const JSON_CONTENT = Content.replace('```json','').replace('```','');
    console.log(JSON_CONTENT);

    const FINAL_CONTENT = JSON_CONTENT.match(/\{[\s\S]*\}/)[0];
    console.log(FINAL_CONTENT);


    //save to database
    const { data, error } = await supabase
      .from("interview-feedback")
      .insert([
        {
          userName: interviewInfo?.userName,
          userEmail: interviewInfo?.userEmail,
          interview_id: interview_id,
          feedback: JSON.parse(FINAL_CONTENT),
          recommended: false,
        },
      ])
      .select();
    console.log(data);
    router.replace("/interview/" + interview_id + "/completed");
    setLoading(false);
  };

  return (
    <div className="p-20 lg:px-48 xl:px-56">
      <h2 className="font-bold text-xl flex justify-between">
      Buổi phỏng vấn với AI
        <span className="flex gap-2 items-center">
          <Timer /> <TimerComponent isRunning={isRunning} />
        </span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mt-5">
        <div className="bg-white h-[400px] shadow-md p-40 rounder-lg border flex flex-col gap-3 items-center justify-center">
          <div className="relative">
            {!activeUser && (
              <span className="absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping"></span>
            )}
            <Image
              src={"/Ai3.png"}
              alt="ai"
              width={100}
              height={100}
              className="w-[60px] h-[60px] rounded-full object-cover"
            />
          </div>
          <h2>Người Phỏng Vấn</h2>
        </div>

        <div>
          <div className="bg-white h-[400px] shadow-md p-40 rounder-lg border flex flex-col gap-3 items-center justify-center">
            <div className="relative">
              {activeUser && (
                <span className="absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping"></span>
              )}

              <h2 className="text-2xl bg-primary text-white p-3 rounded-full px-5">
                {interviewInfo?.userName[0]}
              </h2>
            </div>
            <h2>{interviewInfo?.userName}</h2>
          </div>
        </div>
      </div>

      <div className="flex gap-5 justify-center items-center mt-5">
        <Mic className="h-12 w-12 p-3 bg-gray-500 text-white rounded-full cursor-pointer" />
        <AlertComfirmation stopInterview={() => stopInterview()}>
          {!loading ? (
            <Phone className="h-12 w-14 p-3 bg-red-500 text-white  rounded-full cursor-pointer" />
          ) : (
            <Loader2Icon className="animate-spin" />
          )}
        </AlertComfirmation>
      </div>
      <h2 className="text-sm text-gray-400 text-center mt-3">
        Đang trong quá trình phỏng vấn ....
      </h2>
    </div>
  );
}

export default StartInterview;
