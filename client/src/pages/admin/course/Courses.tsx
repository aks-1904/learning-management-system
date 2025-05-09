import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetInstructorCoursesQuery } from "@/features/api/courseapi";
import { Course } from "@/types/data";
import { Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Courses = () => {
  const { data, isLoading } = useGetInstructorCoursesQuery();
  const navigate = useNavigate();

  if (isLoading) return <h1>Loading....</h1>;
  console.log(data);

  return (
    <div>
      <Button onClick={() => navigate("/instructor/create-course")}>
        Create a new Course
      </Button>
      <Table className="mt-10">
        <TableCaption>List of your Courses</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.courses?.map((course: Course) => (
            <TableRow key={course?._id}>
              <TableCell className="font-medium">{course?.title}</TableCell>
              <TableCell>{course?.price || "NA"}</TableCell>
              <TableCell
                className={`${
                  course?.isPublished ? "text-green-600" : "text-red-600"
                } font-bold`}
              >
                {course?.isPublished ? "Published" : "Unpublished"}
              </TableCell>
              <TableCell className="text-end">
                <Button size={"sm"} variant={"outline"}>
                  <Edit /> Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Courses;
