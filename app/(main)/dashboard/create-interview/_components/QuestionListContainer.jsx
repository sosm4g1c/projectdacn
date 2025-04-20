import React from "react";

function QuestionListContainer({questionList}) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4 text-gray-800">
        Danh sách câu hỏi phỏng vấn:
      </h2>

      {questionList.map((item, index) => (
        <div key={index} className="p-3 border border-gray-200 rounded-xl mb-3">
          <h2 className="font-medium text-gray-800">{item.question}</h2>
          <p className="text-sm text-gray-500 italic">
            Loại câu hỏi: {item.type}
          </p>
        </div>
      ))}
    </div>
  );
}

export default QuestionListContainer;
