"use client";
import { useUser } from "../../provider";
import { supabase } from "../../../services/supabaseClient";

import React, { useEffect, useState } from "react";
import { Video } from "lucide-react";
import { Button } from "../../../components/ui/button";

import InterviewCard from "../_components/InterviewCard";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../../components/ui/pagination"

import { toast } from "sonner";

function AllInterview() {
  const [interviewList, setInterviewList] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    user && GetInterviewList();
  }, [user]);

  const GetInterviewList = async () => {
    let { data: Interviews, error } = await supabase
      .from("Interviews")
      .select("*, interview-feedback(userEmail)")
      .eq("userEmail", user?.email)
      .order("id", { ascending: false });
    console.log(Interviews);
    setInterviewList(Interviews);
  };

  // phan trang
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = interviewList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(interviewList.length / itemsPerPage);
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="my-5">
      <h2 className="font-bold text-xl">
        Danh Sách Các Cuộc Phỏng Vấn Đã Tạo{" "}
      </h2>
      {interviewList?.length == 0 && (
        <div className="p-5 flex flex-col gap-3 items-center mt-5 bg-white">
          <Video className="h-10 w-10 text-primary" />
          <h2>Bạn chưa tạo bất kỳ buổi phỏng vấn nào!</h2>
          <Button>+ Tạo Phỏng Vấn</Button>
        </div>
      )}

      {/* {interviewList.map((interview, index) => (
            <InterviewCard interview={interview} key={index} viewDetail={true} />
          ))} */}

      {interviewList && (
        <>
          <div className="grid grid-cols-2 xl:grid-cols-3 gap-5 mt-5">
            {currentItems.map((interview, index) => (
              <InterviewCard
                interview={interview}
                key={index}
                viewDetail={true}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center mt-5">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(currentPage - 1);
                      }}
                    />
                  </PaginationItem>

                  {Array.from({ length: totalPages }, (_, index) => (
                    <PaginationItem key={index}>
                      <PaginationLink
                        href="#"
                        className={
                          currentPage === index + 1
                            ? "bg-primary text-white"
                            : ""
                        }
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(index + 1);
                        }}
                      >
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(currentPage + 1);
                      }}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default AllInterview;
