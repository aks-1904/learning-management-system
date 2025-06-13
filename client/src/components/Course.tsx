import { IndianRupee } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardTitle } from "./ui/card";
import type { Course } from "@/types/data";

interface Props {
  course: Course;
}

const Course = (data: Props) => {
  return (
    <Card className="overflow-hidden py-0 pb-6 rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transition-all duration-200 transform hover:scale-105 cursor-pointer">
      <div className="relative">
        <img
          className="w-full h-36 object-cover rounded-t-lg"
          src={data?.course?.thumbnail}
          alt="course"
        />
      </div>
      <CardContent>
        <CardTitle className="hover:underline truncate">
          {data?.course?.title}
        </CardTitle>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={data?.course?.creator?.profilePicture || ""} />
              <AvatarFallback>AK</AvatarFallback>
            </Avatar>
            <h3 className="font-medium text-sm text-center">
              {data?.course?.creator?.name}
            </h3>
          </div>
          <Badge className="bg-blue-600 text-white px-2 py-1 text-xs rounded-full">
            {data?.course?.level}
          </Badge>
        </div>
        <div>
          <span className="text-lg font-bold flex items-center mt-2">
            <IndianRupee />
            {data?.course?.price}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default Course;
