import Course from "@/components/Course";
import CourseSkeleton from "@/components/CourseSkeleton";
import { useGetPublishedCoursesQuery } from "@/features/api/courseapi";
import { useEffect, useState } from "react";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const { data, isLoading, isSuccess, isError } = useGetPublishedCoursesQuery();

  useEffect(() => {
    setCourses(data?.courses);
    console.log(data?.courses)
  }, [isSuccess]);

  if (isError) return <h1>Some error occured while loading courses</h1>;

  return (
    <div className="bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="font-bold text-3xl text-center mb-10">Our Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading
            ? [1, 2, 3, 4].map((_, idx) => <CourseSkeleton key={idx} />)
            : courses?.map((data, idx) => (
                <div key={idx}>
                  <Course course={data} />
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
