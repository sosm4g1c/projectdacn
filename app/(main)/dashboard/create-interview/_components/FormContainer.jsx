import React, { useEffect, useState } from "react";
import { Input } from "../../../../../components/ui/input";
import { Textarea } from "../../../../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../../components/ui/select";
import { InterviewType } from "../../../../../services/Constants";
import { Button } from "../../../../../components/ui/button";
import { ArrowRight } from "lucide-react";

function FormContainer({ onHandleInputChange, GoToNext }) {
  const [interviewType, setInterviewType] = useState([]);
  useEffect(() => {
    if (interviewType) {
      onHandleInputChange("type", interviewType);
    }
  }, [interviewType]);

  const AddInterviewType = (type) => {
    const data = interviewType.includes(type);
    if (!data) {
      setInterviewType((prev) => [...prev, type]);
    } else {
      const result = interviewType.filter((item) => item != type);
      setInterviewType(result);
    }
  };

  return (
    <div className="p-5 bg-white rounded-xl">
      <div>
        <h2 className="text-sm font-medium">Vị Trí Công Việc</h2>
        <Input
          placeholder="ví dụ: Fullstack Developer,...."
          className="mt-2"
          onChange={(e) => onHandleInputChange("jobPosition", e.target.value)}
        />
      </div>

      <div className="mt-5">
        <h2 className="text-sm font-medium">Miêu Tả Công Việc</h2>
        <Textarea
          placeholder="Nhập miêu tả chi tiết công việc"
          className="h-[200px] mt-2"
          onChange={(e) =>
            onHandleInputChange("jobDescription", e.target.value)
          }
        />
      </div>

      <div className="mt-5">
        <h2 className="text-sm font-medium">Thời Gian Phỏng Vấn</h2>
        <Select
          onValueChange={(value) => onHandleInputChange("duration", value)}
        >
          <SelectTrigger className="w-full mt-2">
            <SelectValue placeholder="Lựa chọn thời gian" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5 phút">5 Phút</SelectItem>
            <SelectItem value="15 phút">15 Phút</SelectItem>
            <SelectItem value="30 phút">30 Phút</SelectItem>
            <SelectItem value="45 phút">45 Phút</SelectItem>
            <SelectItem value="60 phút">60 Phút</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mt-5">
        <h2 className="text-sm font-medium">Chủ đề</h2>
        <div className="flex gap-2 flex-wrap mt-2">
          {InterviewType.map((type, index) => (
            <div
              key={index}
              className={`flex gap-2 p-1 px-2 border border-gray-300 rounded-2xl items-center 
              justify-center cursor-pointer hover:bg-secondary 
              ${interviewType.includes(type.title) ? "bg-blue-100 text-primary" : "bg-white"} `}
              onClick={() => AddInterviewType(type.title)}
            >
              <type.icon className="w-4 h-4 " />
              <span>{type.title}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 flex justify-end" onClick={() => GoToNext()}>
        <Button>
          Khởi Tạo Câu Hỏi <ArrowRight />
        </Button>
      </div>
    </div>
  );
}

export default FormContainer;
