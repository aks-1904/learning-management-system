import Course from "@/components/Course";
import CourseSkeleton from "@/components/CourseSkeleton";

const MyLearning = () => {
  const isLoading = false;
  const learningCourses: any[] = [];

  return (
    <div className="max-w-4xl mx-auto my-24 px-4 md:px-0">
      <h1 className="font-bold text-2xl uppercase">My learning</h1>
      <div className="my-5 grid grid-cols-1 md:grid-cols-2 gap-6">
        {isLoading ? (
          [1, 2, 3, 4].map((_, idx) => <CourseSkeleton key={idx} />)
        ) : learningCourses.length === 0 ? (
          <p>You are not enrolled in any course</p>
        ) : (
          learningCourses.map((_, idx) => <Course key={idx} />)
        )}
      </div>
    </div>
  );
};

export default MyLearning;
