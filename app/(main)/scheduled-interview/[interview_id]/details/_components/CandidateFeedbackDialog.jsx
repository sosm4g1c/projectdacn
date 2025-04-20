import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../../../components/ui/dialog";
import { Button } from "../../../../../../components/ui/button";
import { Progress } from "../../../../../../components/ui/progress";
import { Send } from "lucide-react";


function CandidateFeedbackDialog({ candidate }) {
  const feedback = candidate?.feedback?.feedback;

  const url = process.env.NEXT_PUBLIC_HOST_URL + "/" + candidate?.interview_id;
  const onSend = () => {
    window.location.href =
      `mailto:${candidate?.userEmail}?subject=AiCruiter Interview Link & body=Interview Link:` +
      url;
  };
  console.log("Recommendation Value:", feedback?.Recommendation);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-primary">
          Chi Tiết Đánh Giá
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Chi Tiết Đánh Giá</DialogTitle>
          <DialogDescription asChild>
            <div className="mt-5">
              <div className="flex justify-between items-center ">
                <div className="flex items-center gap-5">
                  <h2 className="bg-primary p-3 px-4 font-bold text-white rounded-full">
                    {candidate?.userName[0]}
                  </h2>
                  <div>
                    <h2 className="font-bold">{candidate?.userName}</h2>
                    <h2 className="text-sm text-gray-500">
                      {candidate?.userEmail}
                    </h2>
                  </div>
                </div>
                <div className=" flex gap-3 items-center">
                  <h2 className="text-primary text-2xl font-bold">
                    {(
                      (feedback?.rating?.technicalSkills +
                        feedback?.rating?.communication +
                        feedback?.rating?.problemSolving +
                        feedback?.rating?.experience) /
                      4
                    ).toFixed(1)}
                    /10
                  </h2>
                </div>
              </div>
              <div className="mt-5">
                <h2 className="font-bold">Đánh giá các kỹ năng</h2>
                <div className="mt-3 grid grid-cols-2 gap-10">
                  <div>
                    <h2 className="flex justify-between">
                      Technical Skills{" "}
                      <span>{feedback?.rating?.technicalSkills}/10</span>
                    </h2>
                    <Progress
                      value={feedback?.rating?.technicalSkills * 10}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <h2 className="flex justify-between">
                      Communication{" "}
                      <span>{feedback?.rating?.communication}/10</span>
                    </h2>
                    <Progress
                      value={feedback?.rating?.communication * 10}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <h2 className="flex justify-between">
                      Problems Solving{" "}
                      <span>{feedback?.rating?.problemSolving}/10</span>
                    </h2>
                    <Progress
                      value={feedback?.rating?.problemSolving * 10}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <h2 className="flex justify-between">
                      Experience <span>{feedback?.rating?.experience}/10</span>
                    </h2>
                    <Progress
                      value={feedback?.rating?.experience * 10}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <div className="p-5 bg-secondary mt-3 rounded-md ">
                  <h2 className="font-bold mb-2">Tóm tắt đánh giá phỏng vấn:</h2>
                  <p>{feedback.summary}</p>
                </div>
              </div>

              <div
                className={`p-5 mt-8 flex items-center justify-between rounded-lg shadow-sm
    ${
      ["Không", "False", "false", false].includes(
        feedback?.Recommendation?.toString().trim()
      )
        ? "bg-red-100"
        : "bg-green-100"
    }`}
              >
                <div>
                  <h2
                    className={`text-lg font-semibold
        ${
          ["Không", "False", "false", false].includes(
            feedback?.Recommendation?.toString().trim()
          )
            ? "text-red-500"
            : "text-green-500"
        }`}
                  >
                    Gợi ý đánh giá:
                  </h2>
                  <p
                    className={`mt-2 leading-relaxed max-w-md
        ${
          ["Không", "False", "false", false].includes(
            feedback?.Recommendation?.toString().trim()
          )
            ? "text-red-400"
            : "text-green-400"
        }`}
                  >
                    {feedback?.RecommendationMsg}
                  </p>
                </div>

                <Button
                onClick={onSend}
                  className={`px-4 py-2 text-white font-medium rounded-md transition-all duration-200
      ${
        ["Không", "False", "false", false].includes(
          feedback?.Recommendation?.toString().trim()
        )
          ? "bg-red-700 hover:bg-red-800"
          : "bg-green-700 hover:bg-green-800"
      }`}
                >
                  Gửi Tin Nhắn <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default CandidateFeedbackDialog;
