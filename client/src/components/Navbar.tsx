import { LogOut, Menu, School } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "@/features/api/authapi";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { RootState } from "@/types/slice";
import { useAppSelector } from "@/app/hooks";

const Navbar = () => {
  const user = useAppSelector((store: RootState) => store?.auth?.user);
  const navigate = useNavigate();

  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();

  useEffect(() => {
    if (isSuccess) {
      navigate("/login", {
        replace: true,
      });
      toast.success(data?.message || "Logged out successfully");
    }
  }, [isSuccess]);

  return (
    <div className="h-16 dark:bg-[#0A0A0A] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 w-full left-0 right-0 duration-300 z-10 px-10">
      <div className="flex max-w-7xl mx-auto items-center justify-between gap-10 h-full">
        <div
          className="flex gap-2 items-center cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        >
          <School size={30} />
          <h1 className="font-extrabold text-2xl">Learn-Eas</h1>
        </div>
        <div className="md:flex items-center gap-5 hidden">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="cursor-pointer">
                <Avatar>
                  <AvatarImage src={user?.profilePicture} />
                  <AvatarFallback>AK</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/my-learning")}>
                  My learning
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  Edit Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={async () => await logoutUser()}
                  className="flex justify-between"
                >
                  Logout <LogOut />
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {user?.role?.toLowerCase() === "instructor" && (
                  <DropdownMenuItem className="focus:bg-transparent">
                    <Button
                      className="w-full h-full bg-purple-300 hover:bg-purple-400 text-black cursor-pointer"
                      onClick={() => navigate("/instructor/dashboard")}
                    >
                      Dashboard
                    </Button>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                variant={"outline"}
                onClick={() => navigate("/login", { replace: true })}
              >
                Login
              </Button>
              <Button onClick={() => navigate("/register", { replace: true })}>
                Register
              </Button>
            </div>
          )}
          <ModeToggle />
        </div>
        <div className="flex md:hidden items-center justify-between px-4 h-full">
          <MobileNavbar />
        </div>
      </div>
    </div>
  );
};

export default Navbar;

const MobileNavbar = () => {
  const user = useAppSelector((store: RootState) => store?.auth?.user);
  const navigate = useNavigate();
  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();

  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Logged out successfully");
    }
  }, [isSuccess]);

  return (
    <Sheet open={open} onOpenChange={() => setOpen(!open)}>
      <SheetTrigger asChild>
        <Button
          size={"icon"}
          className="rounded-full bg-gray-200 hover:bg-gray-300 cursor-pointer"
          variant="outline"
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="px-8">
        <SheetHeader className="flex flex-row items-center justify-between px-0 z-[999]">
          <SheetTitle>Learn-Eas</SheetTitle>
          <div className="z-[999]">

          <ModeToggle />
          </div>
        </SheetHeader>
        <Separator className="mr-2" />
        {user ? (
          <>
            <nav className="flex flex-col space-y-1 text-sm font-medium">
              <span
                className="cursor-pointer hover:bg-gray-100 px-3 py-2 dark:hover:bg-gray-800 rounded-md"
                onClick={() => navigate("/my-learning")}
              >
                My Learning
              </span>
              <span
                className="cursor-pointer hover:bg-gray-100 px-3 py-2 dark:hover:bg-gray-800 rounded-md"
                onClick={() => navigate("/profile")}
              >
                Edit Profile
              </span>
              {user?.role?.toLowerCase() === "instructor" && (
                <span
                  onClick={() => navigate("/instructor/dashboard")}
                  className="cursor-pointer bg-purple-400 text-white hover:bg-purple-500 px-4 py-2 rounded-md text-center mt-3"
                >
                  Dashboard
                </span>
              )}
            </nav>
            <SheetFooter>
              <SheetClose asChild>
                <Button onClick={async () => await logoutUser()} type="submit">
                  Logout
                </Button>
              </SheetClose>
            </SheetFooter>
          </>
        ) : (
          <>
            <Button
              variant="outline"
              onClick={() => {
                navigate("/login", { replace: true });
                setOpen(false);
              }}
            >
              Login
            </Button>
            <Button
              onClick={() => {
                navigate("/register", { replace: true });
                setOpen(false);
              }}
            >
              Register
            </Button>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};
