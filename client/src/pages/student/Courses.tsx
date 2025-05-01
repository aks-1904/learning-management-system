import Course from "@/components/Course";
import CourseSkeleton from "@/components/CourseSkeleton";

const Courses = () => {
  const isLoading = false;
  const courses = [1, 2, 3, 4];

  return (
    <div className="bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="font-bold text-3xl text-center mb-10">Our Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading
            ? [1, 2, 3, 4].map((_, idx) => <CourseSkeleton key={idx} />)
            : courses.map((_, idx) => <Course key={idx} />)}
        </div>
      </div>
    </div>
  );
};

export default Courses;
