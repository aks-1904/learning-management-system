import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateCourseMutation } from "@/features/api/courseapi";
import { CreateCourse } from "@/types/form";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AddCourse = () => {
  const navigate = useNavigate();

  const [courseData, setCourseData] = useState<CreateCourse>({
    title: "",
    category: "",
  });

  const [createCourse, { data, isLoading, error, isSuccess }] =
    useCreateCourseMutation();

  const createCourseHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await createCourse(courseData);
  };

  useEffect(() => {
    if (isSuccess) {
      setCourseData({
        title: "",
        category: "",
      });
      navigate("/instructor/courses", {
        replace: true,
      });
      toast.success(data?.message || "Course created successfully");
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
    <div className="flex-1 mx-10 w-full mt-10">
      <div className="mb-4">
        <h1 className="font-bold text-xl pr-20">
          Lets add course, add some basic course details for your new course
        </h1>
        <p className="text-gray-600 text-sm dark:text-gray-400 pr-20">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt
          debitis numquam ullam fugit maxime. Fugit voluptate harum quibusdam
          libero doloribus delectus voluptatem eum, consectetur cupiditate
          repudiandae. Libero illo similique dolore.
        </p>
      </div>
      <form
        onSubmit={(e) => createCourseHandler(e)}
        className="space-y-4 md:w-1/2 pr-20"
      >
        <div className="flex flex-col gap-2">
          <Label htmlFor="title">Title</Label>
          <Input
            value={courseData.title}
            onChange={(e) =>
              setCourseData({ ...courseData, title: e.target.value })
            }
            type="text"
            name="title"
            id="title"
            placeholder="Course Title..."
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Category</Label>
          <Select
            value={courseData.category}
            onValueChange={(e) => setCourseData({ ...courseData, category: e })}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="MERN Stack">MERN Stack</SelectItem>
                <SelectItem value="Frontend Development">
                  Frontend Development
                </SelectItem>
                <SelectItem value="Backend Development">
                  Backend Development
                </SelectItem>
                <SelectItem value="Full Stack Development Stack">
                  Full Stack Development Stack
                </SelectItem>
                <SelectItem value="Python">Python</SelectItem>
                <SelectItem value="Android App Development">
                  Android App Development
                </SelectItem>
                <SelectItem value="Database">Database</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
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
              <Button type="submit">Create</Button>
              <Button
                variant="outline"
                onClick={() => {
                  navigate("/instructor/courses");
                }}
              >
                Back
              </Button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddCourse;
