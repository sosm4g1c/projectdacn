"use client";

import Image from "next/image";
import { Button } from "../components/ui/button";
import { useRouter } from "next/navigation";
import { supabase } from "../services/supabaseClient";

export default function Home() {
  const router = useRouter();

  const handleCreateNewInterviewClick = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session) {
      router.push("/dashboard/create-interview"); // đã đăng nhập
    } else {
      router.push("/auth"); // chưa đăng nhập
    }
  };

const handleDashboardClick = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session) {
      router.push("/dashboard"); // đã đăng nhập
    } else {
      router.push("/auth"); // chưa đăng nhập
    }
  };



  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f0f5ff] to-white ">
      {/* Top Nav */}
      <div className=" px-10 flex h-16 justify-between items-center mb-4 bg-white ">
        <div className="text-2xl font-bold flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="AIcruiter"
            width={200}
            height={200}
            className="w-[150px]"
          />
        </div>
        <div className="space-x-6 font-medium ">
          <Button
            className="ml-4 bg-blue-600 text-white hover:bg-blue-700"
            onClick={handleDashboardClick}
          >
            Trang Chủ
          </Button>
        </div>
      </div>

      {/* Main Section */}
      <div className="py-10 flex  justify-center w-full md:py-28 bg-gradient-to-b from-blue-50 to-white">
        {/* Left Content */}
        <div className="max-w-xl text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Trợ lý <span className="text-blue-600">phỏng vấn sử dụng AI</span>{" "}
            dành cho nhà tuyển dụng hiện đại!
          </h1>

          <p className="text-gray-600 mb-8">
          Hãy để trợ lý giọng nói AI của chúng tôi thực hiện các cuộc phỏng vấn với ứng viên, trong khi bạn tập trung vào việc tìm kiếm ứng viên phù hợp nhất. <br></br><span className="text-blue-600 font-bold">Tiết kiệm thời gian</span>, <span className="text-blue-600 font-bold">giảm thiểu thiên vị </span> và <span className="text-blue-600 font-bold">nâng cao hiệu quả </span> quy trình tuyển dụng!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button
              className="bg-blue-600 text-white hover:bg-blue-700"
              onClick={handleCreateNewInterviewClick}
            >
              Tạo Phỏng Vấn →
            </Button>
            <Button variant="outline" onClick={handleDashboardClick}>
             Khám Phá Ngay!
            </Button>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative w-[600px] max-w-full h-auto mb-10 ml-5 md:mb-0">
          <Image
            src="/demo.png"
            alt="Demo Screenshot"
            width={700}
            height={500}
            className="rounded-xl shadow-xl"
          />
        </div>
      </div>
    </div>
  );
}
