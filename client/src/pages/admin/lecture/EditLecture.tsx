import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import LectureTab from "./LectureTab";

const EditLecture = () => {
  const { courseId } = useParams();

  return (
    <div className="flex justify-between flex-col gap-5 mb-5">
      <div className="flex items-center gap-2">
        <Link to={`/instructor/course/${courseId}/lectures`}>
          <Button size={"icon"} variant={"outline"} className="rounded-full">
            <ArrowLeft size={16} />
          </Button>
        </Link>
        <h1 className="font-bold text-xl">Update Your Lecture</h1>
      </div>
      <LectureTab />
    </div>
  );
};

export default EditLecture;
