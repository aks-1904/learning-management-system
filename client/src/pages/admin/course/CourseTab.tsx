import RichTextEditor from "@/components/RichTextEditor";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import {
  useEditCourseMutation,
  useGetCourseByIdQuery,
} from "@/features/api/courseapi";
import { CourseDetails } from "@/types/form";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const CourseTab = () => {
  const isPublished = false;
  const navigate = useNavigate();
  const [previewThumbail, setPreviewThumbail] = useState<
    string | ArrayBuffer | null
  >(null);
  const { courseId } = useParams();

  const { data: courseDataById, isLoading: courseByIdLoading } =
    useGetCourseByIdQuery(courseId, { refetchOnMountOrArgChange: true });

  const course = courseDataById?.course;
  const [input, setInput] = useState<CourseDetails>({
    _id: courseId!,
    title: "",
    subTitle: "",
    category: "",
    description: "",
    level: "",
    price: 0,
    thumbnail: null,
  });

  useEffect(() => {
    if (course) {
      setInput(course);
    }
    console.log(course);
  }, [courseId, course, courseDataById]);

  const onValueChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectThumbnail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setInput({ ...input, thumbnail: file });
      const fileReader = new FileReader();
      fileReader.onloadend = () => setPreviewThumbail(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  };

  const [editCourse, { data, isLoading, isSuccess, error }] =
    useEditCourseMutation();

  const updateCourseHandler = async () => {
    try {
      const formData = new FormData();
      formData.append("title", input.title);
      formData.append("subTitle", input.subTitle);
      formData.append("category", input.category);
      formData.append("description", input.description);
      formData.append("level", input.level);

      if (input.price) {
        formData.append("price", input.price.toString());
      }
      if (input.thumbnail) {
        formData.append("thumbnail", input.thumbnail);
      }
      console.log(courseId || course?._id);
      const id = courseId || course?._id;
      await editCourse({ formData, id });
    } catch (error: any) {
      console.log(error);
      toast.error(
        error?.response?.data?.message || "Couldn't complete your request"
      );
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Course updated");
    }
    if (error) {
      const message =
        "data" in error
          ? (error.data as { message?: string })?.message
          : "Failed to update course";
      toast.error(message);
    }
  }, [data, error, isSuccess]);

  {
    return courseByIdLoading ? (
      <>Please Wait...</>
    ) : (
      <div>
        <Card>
          <CardHeader className="flex items-center justify-between">
            <div>
              <CardTitle>Basic course information</CardTitle>
              <CardDescription className="mt-2">
                Make changes to your courses here. CLick save when you are done
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant={"outline"}>
                {isPublished ? "Unpublished" : "Published"}
              </Button>
              <Button>Remove Course</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 mt-5">
              <div className="space-y-1">
                <Label htmlFor="title">Title</Label>
                <Input
                  type="text"
                  placeholder="Ex. MERN Stack"
                  id="title"
                  name="title"
                  value={input.title}
                  onChange={onValueChangeHandler}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="subTitle">Sub Title</Label>
                <Input
                  type="text"
                  placeholder="Ex. Learn MERN stack easily with us"
                  id="subTitle"
                  name="subTitle"
                  value={input.subTitle}
                  onChange={onValueChangeHandler}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="description">Description</Label>
                <RichTextEditor input={input} setInput={setInput} />
              </div>
              <div className="flex items-center gap-5">
                <div>
                  <Label>Category</Label>
                  <Select
                    value={input.category}
                    onValueChange={(e) => setInput({ ...input, category: e })}
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
                <div>
                  <Label>Course Level</Label>
                  <Select
                    value={input.level}
                    onValueChange={(e) => setInput({ ...input, level: e })}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select a Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">
                          Intermediate
                        </SelectItem>
                        <SelectItem value="advance">Advance</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Price in (INR)</Label>
                  <Input
                    type="number"
                    value={input.price as number}
                    onChange={onValueChangeHandler}
                    name="price"
                    placeholder="999"
                    className="w-fit"
                  />
                </div>
              </div>
              <div>
                <Label>Course Thumbail</Label>
                <Input
                  onChange={selectThumbnail}
                  type="file"
                  accept="image/*"
                  className="w-fit"
                />
                {previewThumbail && (
                  <img
                    src={previewThumbail as string}
                    alt="img"
                    className="w-64 my-2"
                  />
                )}
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={() =>
                    navigate("/instructor/courses", {
                      replace: true,
                    })
                  }
                  variant={"outline"}
                >
                  Cancel
                </Button>
                <Button disabled={isLoading} onClick={updateCourseHandler}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                      Wait...
                    </>
                  ) : (
                    <>Save</>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
};

export default CourseTab;
