import { Lecture } from "@/types/data";
import { Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Props {
  lecture: Lecture;
  index: number;
  courseId?: string;
}

const LectureElem = (props: Props) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between bg-[#F7F9FA] dark:bg-gray-800 px-4 py-2 rounded-md my-2">
      <h1 className="font-bold text-gray-800 dark:text-gray-200">
        Lecture {props.index + 1} {": "}
        {props.lecture.title}
      </h1>
      <Edit
        onClick={() => {
          navigate(
            `/instructor/course/${props.courseId}/lectures/${props.lecture?._id}`
          );
        }}
        size={20}
        className="cursor-pointer text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-100"
      />
    </div>
  );
};

export default LectureElem;
