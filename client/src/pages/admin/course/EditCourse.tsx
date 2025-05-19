import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import CourseTab from "./CourseTab";

const EditCourse = () => {
  const { pathname } = useLocation();

  return (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-5">
        <h1 className="font-bold text-xl">
          Add detail information regarding course
        </h1>
        <Link to={`${pathname}/lectures`}>
          <Button
            variant={"link"}
            className="cursor-pointer hover:text-indigo-500"
          >
            Go to lectures page
          </Button>
        </Link>
      </div>
      <CourseTab />
    </div>
  );
};

export default EditCourse;
