import { Calendar, Clock } from "lucide-react";
import React from "react";
import moment from "moment";

function InterviewDetailContainer({ interviewDetail }) {
  return (
    <div className="p-5 bg-white rounded-lg shadow-md mt-5">
      <h2>Vị trí tuyển dụng: <span className="font-bold">{interviewDetail?.jobPosition}</span></h2>
      <div className="mt-4 flex items-center justify-between gap-3 lg:pr-40">
        <div>
          <h2 className="text-sm text-gray-500">Thời gian</h2>
          <h2 className="flex text-sm items-center gap-2 font-bold">
            <Clock className="h-4 w-4" />
            {interviewDetail?.duration}
          </h2>
        </div>
        <div>
          <h2 className="text-sm text-gray-500">Khởi tạo</h2>
          <h2 className="flex text-sm items-center gap-2 font-bold">
            <Calendar className="h-4 w-4" />
            {moment(interviewDetail?.created_at).locale('vi').format('DD [Tháng] MM YYYY')}
          </h2>
        </div>
        {interviewDetail?.type && (
          <div>
            <h2 className="text-sm text-gray-500">Chủ đề</h2>
            <h2 className="flex text-sm items-center gap-2 font-bold">
              <Clock className="h-4 w-4" />
              {JSON.parse(interviewDetail?.type)[0]}
            </h2>
          </div>
        )}
      </div>
      <div className="mt-5">
        <h2 className="font-bold">Miêu Tả Công Việc:</h2>
        <p className="text-sm leading-6">{interviewDetail?.jobDescription}</p>
      </div>
      <div className="mt-5">
        <h2 className="font-bold">Danh Sách Các Câu Hỏi Phỏng Vấn:</h2>
        <div className="grid grid-cols-2 gap-3 mt-3">
          {interviewDetail?.questionList.map((item, index) => (
            <h2 className="text-sm" key={index}>{index+1}.{item?.question}</h2>
          ))}
        </div>
      </div>
    </div>
  );
}

export default InterviewDetailContainer;
