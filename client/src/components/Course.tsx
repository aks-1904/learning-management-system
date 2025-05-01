import { IndianRupee } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardTitle } from "./ui/card";

const Course = () => {
  return (
    <Card className="overflow-hidden py-0 pb-6 rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transition-all duration-200 transform hover:scale-105 cursor-pointer">
      <div className="relative">
        <img
          className="w-full h-36 object-cover rounded-t-lg"
          src="https://foundr.com/wp-content/uploads/2023/04/How-to-create-an-online-course.jpg.webp"
          alt="course"
        />
      </div>
      <CardContent>
        <CardTitle className="hover:underline truncate">
          MERN stack complete course in Hindi
        </CardTitle>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>AK</AvatarFallback>
            </Avatar>
            <h3 className="font-medium text-sm text-center">Akshay Sharma</h3>
          </div>
          <Badge className="bg-blue-600 text-white px-2 py-1 text-xs rounded-full">
            Beginner
          </Badge>
        </div>
        <div>
          <span className="text-lg font-bold flex items-center mt-2">
            <IndianRupee />
            499
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default Course;
