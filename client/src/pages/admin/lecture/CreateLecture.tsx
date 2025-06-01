import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useCreateLectureMutation,
  useGetCourseLectureQuery,
} from "@/features/api/courseapi";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import LectureElem from "./Lecture";
import { Lecture } from "@/types/data";

const CreateLecture = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const { courseId } = useParams();

  const [createLecture, { data, isLoading, error, isSuccess }] =
    useCreateLectureMutation();
  const {
    data: lectureData,
    isLoading: isLectureLoading,
    isError: lectureErr,
    refetch,
  } = useGetCourseLectureQuery(courseId);

  const createLectureHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await createLecture({ title, id: courseId });
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success(data?.message || "Lecture created successfully");
    }
    if (error) {
      const message =
        "data" in error
          ? (error.data as { message?: string })?.message
          : "Login Failed";
      toast.error(message);
    }
  }, [isSuccess, error]);

  return (
    <div className="flex-1 mx-10 mt-10">
      <div className="mb-4">
        <h1 className="font-bold text-xl pr-20">Lets add a new lectures</h1>
        <p className="text-gray-600 text-sm dark:text-gray-400 pr-20">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt
          debitis numquam ullam fugit maxime. Fugit voluptate harum quibusdam
          libero doloribus delectus voluptatem eum, consectetur cupiditate
          repudiandae. Libero illo similique dolore.
        </p>
      </div>
      <form
        className="space-y-4 md:w-1/2 pr-20"
        onSubmit={(e) => createLectureHandler(e)}
      >
        <div className="flex flex-col gap-2">
          <Label htmlFor="title">Title</Label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            name="title"
            id="title"
            placeholder="Lecture Title..."
          />
        </div>
        <div className="flex gap-3">
          {isLoading ? (
            <>
              <Button disabled>
                <Loader2 className="h-4 w-4 animate-spin mr-2" /> Please Wait...
              </Button>
            </>
          ) : (
            <>
              <Button type="submit">Create Lecture</Button>
              <Button
                variant="outline"
                onClick={() => {
                  navigate(`/instructor/course/${courseId}`, {
                    replace: true,
                  });
                }}
              >
                Back To Course
              </Button>
            </>
          )}
        </div>
      </form>
      <div className="mt-10">
        {isLectureLoading ? (
          <p>Loading lectures...</p>
        ) : lectureErr ? (
          <p>Failed to load lectures data</p>
        ) : lectureData.lectures.length === 0 ? (
          <p>No lecture available</p>
        ) : (
          lectureData?.lectures?.map((data: Lecture, idx: number) => (
            <LectureElem
              key={data?._id}
              lecture={data}
              index={idx}
              courseId={courseId!}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default CreateLecture;
