import Image from "next/image";
import React from "react";

function InterviewComplete() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center pt-4">
      <div className="bg-white shadow-2xl border border-gray-300 rounded-3xl p-10 max-w-2xl w-full text-center">
        {/* Check icon */}
        <div className="flex justify-center mb-4">
          <Image
            src="/checkinterviewcompleted.jpg"
            alt="Check interview completed"
            width={90}
            height={90}
            className="rounded-full"
          />
        </div>

        {/* Title */}
        <h2 className="text-4xl font-bold text-gray-800 mb-2">
          Hoàn Tất Buổi Phỏng Vấn
        </h2>

        {/* Short thank-you message */}
        <p className="text-gray-400 text-base sm:text-lg mb-2">
        Cảm ơn bạn đã tham gia buổi phỏng vấn sử dụng AI cùng{" "}
          <span className="font-semibold text-blue-600">Alcruiter</span>.
        </p>

        {/* Illustration */}
        <div className="mt-8">
          <Image
            src="/InterviewCompleted.jpg"
            alt="Interview completed illustration"
            width={500}
            height={300}
            className="rounded-2xl mx-auto"
          />
        </div>

        {/* What's next section */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl px-6 py-4 mt-6 text-left flex flex-col justify-contens items-center">
          <Image
            src={"/send.png"}
            alt="send"
            width={50}
            height={50}
            className="w-[50px] h-[50px]"
          />
          <h3 className="text-lg font-semibold text-blue-400 mb-1">
          What’s next?
          </h3>
          <p className="text-sm text-gray-500 text-center">
          Nhà tuyển dụng sẽ xem xét câu trả lời phỏng vấn của bạn. Bạn sẽ sớm được liên hệ về các bước tiếp theo. Vui lòng kiểm tra hộp thư email thường xuyên nhé!
          </p>
        </div>
      </div>
    </div>
  );
}

export default InterviewComplete;
