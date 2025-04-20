import React from "react";
import moment from "moment";
import { Button } from "../../../components/ui/button";
import { ArrowRight, Copy, Send } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

function InterviewCard({ interview, index, viewDetail = false }) {
  const url = process.env.NEXT_PUBLIC_HOST_URL + "/" + interview?.interview_id;

  // console.log(interview);

  const copyLink = () => {
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard!");
  };

  const onSend = () => {
    window.location.href =
      `mailto:${interview?.userEmail}?subject=AiCruiter Interview Link & body=Interview Link:` +
      url;
  };
  
  return (
    <div className="bg-white p-6 rounded-xl border shadow-sm w-full max-w-md ">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
      <div className="h-10 w-10 bg-blue-600 rounded-full"></div>
        <span className="text-sm text-gray-500">
          {moment(interview?.created_at).locale('vi').format("DD/MM/YYYY")}
        </span>
      </div>

      {/* Job info */}
      <h2 className="font-semibold text-lg text-gray-900">
        {interview?.jobPosition}
      </h2>
      <h2 className="flex  justify-between text-sm text-gray-500 mb-4 ">
        {interview?.duration}{" "}
        <span className="text-green-600">
          {interview["interview-feedback"]?.length || 0} Ứng viên
        </span>
      </h2>

      {/* Buttons */}
      {!viewDetail ? (
        <div className="flex gap-2 w-1/2">
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
            onClick={copyLink}
          >
            <Copy className="w-4 h-4" />
            Copy Link
          </Button>
          <Button
            className="w-full flex items-center justify-center gap-2"
            onClick={onSend}
          >
            <Send className="w-4 h-4" />
            Gửi
          </Button>
        </div>
      ) : (
        <Link
          href={"/scheduled-interview/" + interview?.interview_id + "/details"}
        >
          <Button className="mt-5 w-full  border-2" variant="outline">
            Chi Tiết <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      )}
    </div>
  );
}
export default InterviewCard;
