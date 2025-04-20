"use client";
import React from "react";
import { useUser } from "../../provider";
import Image from "next/image";
// import { User } from "lucide-react";

function WelcomeContainer() {
  const { user } = useUser();
  return (
    <div className="bg-white p-5 rounded-xl flex justify-between items-center shadow-md mt-5 mx-10">
      <div>
        <h2 className="text-lg font-bold">Chào mừng bạn quay lại, {user?.name}</h2>
        <h2 className="text-gray-500 mt-2">Trợ lý phỏng vấn AI đang sẵn sàng!</h2>
      </div>
      {user && (
        <Image src={user?.picture} alt="userAvatar" width={40} height={40} className="rounded-full"/>
      )}
    </div>
  );
}

export default WelcomeContainer;
