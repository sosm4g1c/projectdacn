import React from "react";
import { Phone, Video } from "lucide-react";
import Link from "next/link";

function CreateOptions() {
  return (
    <div className="grid grid-cols-2 gap-5">
      <Link href={'/dashboard/create-interview'} className="bg-white border border-gray-200 rounded-lg p-5 flex flex-col gap-2 cursor-pointer">
        <Video className="p-3 text-primary bg-blue-100 rounded-lg h-12 w-12" />
        <h2 className="font-bold">Tạo Phỏng Vấn</h2>
        <p className="text-gray-500">
          Khởi tạo các cuộc phỏng vấn AI và lên lịch cho các ứng viên
        </p>
      </Link>
      <div className="bg-white border border-gray-200 rounded-lg p-5 flex flex-col gap-2 cursor-pointer">
        <Phone className="p-3 text-primary bg-blue-100 rounded-lg h-12 w-12" />
        <h2 className="font-bold">Tạo Cuộc Gọi Thông Qua Điện Thoại</h2>
        <p className="text-gray-500">
          Lên lịch cuộc gọi thông qua điện thoại với các ứng viên
        </p>
      </div>
    </div>
  );
}

export default CreateOptions;
