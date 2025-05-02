import Course from "@/components/Course";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLoadUserQuery } from "@/features/api/authapi";
import { Loader2 } from "lucide-react";

const Profile = () => {
  const { data, isLoading } = useLoadUserQuery();

  if (isLoading) return <h1>Profile Loading...</h1>;
  const enrolledCourses: any[] | undefined = data?.user?.enrolledCourses;

  return (
    <div className="max-w-4xl mx-auto my-24 px-4">
      <h1 className="font-bold text-2xl text-center md:text-left uppercase">
        Profile
      </h1>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 my-5">
        <div className="flex flex-col items-center">
          <Avatar className="h-24 w-24 md:h-32 md:w-32 mb-4">
            <AvatarImage
              src={data?.user?.profilePicture}
              alt="profilePicture"
            />
            <AvatarFallback>AK</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <div className="mb-2">
            <h1 className="font-semibold text-gray-900 dark:text-gray-100">
              Name:{" "}
              <span className="font-normal text-gray-700 dark:text-gray-300">
                {data?.user?.name}
              </span>
            </h1>
          </div>
          <div className="mb-2">
            <h1 className="font-semibold text-gray-900 dark:text-gray-100">
              E-mail:{" "}
              <span className="font-normal text-gray-700 dark:text-gray-300">
                {data?.user?.email}
              </span>
            </h1>
          </div>
          <div className="mb-2">
            <h1 className="font-semibold text-gray-900 dark:text-gray-100">
              Role:{" "}
              <span className="font-normal text-gray-700 dark:text-gray-300 uppercase">
                {data?.user?.role}
              </span>
            </h1>
          </div>
          <div>
            <Dialog>
              <DialogTrigger asChild>
                <Button size={"sm"} className="mt-2">
                  Edit Profile
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when you're
                    done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="Name..."
                      defaultValue={data?.user?.name}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="profilePicture" className="text-right">
                      Profile Pic
                    </Label>
                    <Input
                      id="profilePicture"
                      accept="image/*"
                      type="file"
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  {isLoading ? (
                    <Button disabled>
                      <Loader2 className="animate-spin mr-2 h-4 w-4" /> Please
                      Wait...
                    </Button>
                  ) : (
                    <Button type="submit">Save Changes</Button>
                  )}
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
      <div>
        {enrolledCourses && enrolledCourses.length !== 0 && (
          <h1 className="font-medium text-lg">Courses you're enrolled in</h1>
        )}
        <div className="my-5 grid grid-cols-1 md:grid-cols-2 gap-6">
          {enrolledCourses && enrolledCourses.length === 0 ? (
            <p>You are not enrolled in any course</p>
          ) : (
            enrolledCourses &&
            enrolledCourses.map((_, idx) => <Course key={idx} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
