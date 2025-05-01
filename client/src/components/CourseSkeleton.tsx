import { Card, CardContent } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

const CourseSkeleton = () => {
  return (
    <Card className="overflow-hidden py-0 pb-6 rounded-lg dark:bg-gray-800 bg-white shadow-lg">
      <div className="relative">
        <Skeleton className="w-full h-36 rounded-t-lg bg-gray-200 dark:bg-gray-700" />
      </div>
      <CardContent>
        <Skeleton className="h-4 w-3/4 mt-4 mb-2 bg-gray-200 dark:bg-gray-700" />
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-3">
            <Skeleton className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="h-4 w-24 bg-gray-200 dark:bg-gray-700" />
          </div>
          <Skeleton className="h-5 w-16 rounded-full bg-gray-200 dark:bg-gray-700" />
        </div>
        <Skeleton className="h-6 w-20 mt-4 bg-gray-200 dark:bg-gray-700" />
      </CardContent>
    </Card>
  );
};

export default CourseSkeleton;
