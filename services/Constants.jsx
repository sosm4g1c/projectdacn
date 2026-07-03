import {
  BriefcaseBusinessIcon,
  Calendar,
  Code2Icon,
  LayoutDashboard,
  List,
  Puzzle,
  Settings,
  User2Icon,
  UsersRound,
} from "lucide-react";
import { title } from "process";
export const SideBarOptions = [
  {
    name: "Trang Chủ",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    name: "Phỏng Vấn Đã Có Đánh Giá",
    icon: Calendar,
    path: "/scheduled-interview",
  },
  {
    name: "Danh Sách Phỏng Vấn Đã Tạo ",
    icon: List,
    path: "/all-interview",
  },
  {
    name: "Cài Đặt",
    icon: Settings,
    path: "/settings",
  },
];

export const InterviewType = [
  {
    title: "Technical",
    icon: Code2Icon,
  },
  {
    title: "Behavioral",
    icon: User2Icon,
  },
  {
    title: "Experience",
    icon: BriefcaseBusinessIcon,
  },
  {
    title: "Problem Solving",
    icon: Puzzle,
  },
  {
    title: "Leadership",
    icon: UsersRound,
  },
];

//Prompt nay danh cho model google/gemini-2.5-pro-exp-03-25:free
// export const QUESTIONS_PROMPT = `
// You are an expert technical interviewer.
// Based on the following inputs, generate a well-structured list of high-quality interview questions:
// Job Title: {{jobTitle}}
// Job Description: {{jobDescription}}
// Interview Duration: {{duration}}
// Interview Type: {{type}}
// 📝 Your task:
// Analyze the job description to identify key responsibilities, required skills, and expected experience.
// Generate a list of interview questions depends on interview duration.
// Adjust the number and depth of questions to match the interview duration.
// Ensure the questions match the tone and structure of a real-life {{type}} interview.
// 🧩 Format your response in JSON format with array list of questions.
// format: interviewQuestions=[
//   {
//     question: "",
//     type: 'Technical/Behavioral/Experince/Problem Solving/Leadership'
//   },
//   {
//     ...
//   }
// ]
// 📜 The goal is to create a structured, relevant, and time-optimized interview plan for a {{jobTitle}} role.
// `;

//Prompt nay danh cho model "mistralai/mistral-7b-instruct:free"
// export const QUESTIONS_PROMPT = `
// You are a professional technical interviewer.

// Your task is to create a list of interview questions based on the following information:

// - Job Title: {{jobTitle}}
// - Job Description: {{jobDescription}}
// - Interview Duration: {{duration}}
// - Interview Type: {{type}} (e.g., Online, On-site, Phone)

// Instructions:
// 1. Analyze the job description to identify main responsibilities, skills, and experience required.
// 2. Based on the duration, estimate a suitable number of questions (e.g., ~1-2 questions per 10 minutes).
// 3. Match the tone and content to a real-life {{type}} interview.
// 4. Classify each question into one of the following types:
//    - Technical
//    - Behavioral
//    - Experience
//    - Problem Solving
//    - Leadership

// Expected output:
// Return a JSON array in the following format:

// interviewQuestions = [
//   {
//     "question": "What is your experience with ...?",
//     "type": "Technical"
//   },
//   {
//     "question": "...",
//     "type": "Behavioral"
//   }
// ]

// Goal: Help the interviewer prepare a relevant and time-optimized interview plan for the {{jobTitle}} role.
// `;

//doan prompt nay cho ket qua tieng viet:
export const QUESTIONS_PROMPT = `
Bạn là một người phỏng vấn kỹ thuật chuyên nghiệp.

Nhiệm vụ của bạn là tạo ra danh sách câu hỏi phỏng vấn cho vị trí fresher dựa trên thông tin sau:

- Vị trí công việc: {{jobTitle}}
- Mô tả công việc: {{jobDescription}}
- Thời gian phỏng vấn: {{duration}} phút
- Hình thức phỏng vấn: {{type}} (ví dụ: Trực tuyến, Trực tiếp, Qua điện thoại)

Hướng dẫn:
1. Phân tích mô tả công việc để xác định các kỹ năng và kiến thức cơ bản cần thiết.
2. Dựa trên thời gian phỏng vấn, tạo số lượng câu hỏi phù hợp (ví dụ: 1-2 câu mỗi 10 phút).
3. Điều chỉnh câu hỏi sao cho phù hợp với ứng viên fresher (ít kinh nghiệm).
4. Phân loại các câu hỏi thành các nhóm sau:
   - Kỹ thuật cơ bản
   - Kỹ năng giao tiếp
   - Kinh nghiệm học tập và thực tập
   - Kỹ năng quản lý

Kết quả mong đợi:
Chỉ trả về JSON hợp lệ.
Không sử dụng markdown.
Không dùng \`\`\`json.
Không giải thích.
Không thêm bất kỳ văn bản nào ngoài JSON.

Trả về một mảng JSON theo định dạng sau:

{
"interviewQuestions" = [
  {
    "question": "Bạn có thể cho chúng tôi biết về các công nghệ Front-end bạn đã học trong quá trình học và thực tập không?",
    "type": "Kỹ thuật cơ bản"
  },
  {
    "question": "Mô tả một tình huống mà bạn có thể cần xây dựng một dự án ReactJS. Bạn sẽ tiếp cận dự án này như thế nào và sử dụng công cụ hoặc kỹ thuật gì?",
    "type": "Kỹ thuật cơ bản"
  },
  {
    "question": "Bạn có thể giải thích JSX và Component Lifecycle trong ReactJS không?",
    "type": "Kỹ thuật cơ bản"
  },
  {
    "question": "Bạn đã từng làm việc nhóm chưa? Hãy chia sẻ một trải nghiệm khi bạn hợp tác và hoàn thành một dự án cùng đồng đội.",
    "type": "Kỹ năng giao tiếp"
  },
  {
    "question": "Bạn hiểu như thế nào về việc tối ưu hóa một website cho SEO và hiệu suất? Bạn có thể chia sẻ kinh nghiệm nào của mình về vấn đề này không?",
    "type": "Kỹ thuật"
  },
  {
    "question": "Hãy chia sẻ kinh nghiệm của bạn với API và kiến trúc RESTful trong phát triển web. Mô tả một dự án mà bạn đã sử dụng API để đạt được một mục tiêu cụ thể.",
    "type": "Kỹ thuật"
  },
  {
    "question": "Bạn có thể thảo luận về kinh nghiệm của bạn trong các dự án nhóm hoặc làm việc nhóm trong quá trình học tập hoặc thực tập không? Hãy chia sẻ một vai trò hoặc trách nhiệm mà bạn đã đảm nhận và cách bạn đóng góp vào việc đạt được mục tiêu của dự án.",
    "type": "Kinh nghiệm học tập và thực tập"
  },
  {
    "question": "Bạn sẽ sử dụng chiến lược nào để quản lý nhiều công việc và ưu tiên trong một dự án lớn?",
    "type": "Kỹ năng quản lý"
  },
  {
    "question": "Hãy chia sẻ một mục tiêu phát triển cá nhân hoặc kỹ thuật mà bạn áp dụng; đó có thể là một phương pháp để giải quyết các vấn đề đặc biệt, một cách để duy trì động lực, hoặc một chiến lược học tập. Hãy chia sẻ một ví dụ về việc bạn đã áp dụng phương pháp này.",
    "type": "Kinh nghiệm học tập và thực tập"
  }
]
}

Mục tiêu: Giúp người phỏng vấn chuẩn bị một buổi phỏng vấn ngắn gọn, phù hợp và hiệu quả cho ứng viên fresher.
`;


export const FEEDBACK_PROMPT = `
{{conversation}}
Dựa trên cuộc phỏng vấn giữa trợ lý và ứng viên,
Hãy đưa ra nhận xét (feedback) cho buổi phỏng vấn này. Đánh giá theo thang điểm 10 cho các tiêu chí: technical Skills, Communication, Problem Solving, Experince. Ngoài ra, hãy viết một đoạn tóm tắt trong 3 dòng về buổi phỏng vấn và một dòng cho biết có nên đề xuất tuyển dụng ứng viên hay không, kèm theo lời nhắn cụ thể.

Hãy trả lời theo định dạng JSON sau:
{
  "feedback": {
    "rating": {
      "technicalSkills": 5,
      "communication": 6,
      "problemSolving": 4,
      "experience": 7
    },
    "summary": "<trong 3 dòng>",
    "Recommendation": "",
    "RecommendationMsg": ""
  }
}
`;
