import { ChartNoAxesColumn, SquareLibrary } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";

const Sidebar = () => {
  const { pathname } = useLocation();

  return (
    <div className="flex">
      <div className="hidden lg:block w-[250px] sm:w-[300px] space-y-8 border-r border-gray-300 dark:border-gray-700 bg-[#f0f0f0] dark:bg-gray-950 p-5 sticky top-0 h-screen">
        <div className="mt-20 space-y-5 text-xl">
          <Link
            to={"/instructor/dashboard"}
            className={`flex items-center gap-2 hover:font-semibold transition-all duration-150 hover:text-indigo-500 ${
              pathname === "/instructor/dashboard" && "text-indigo-500"
            }`}
          >
            <ChartNoAxesColumn size={22} />
            <h1>Dashboard</h1>
          </Link>
          <Link
            to={"/instructor/courses"}
            className={`${
              pathname === "/instructor/courses" && "text-indigo-500"
            } flex items-center gap-2 hover:font-semibold transition-all duration-150 hover:text-indigo-500`}
          >
            <SquareLibrary size={22} />
            <h1>Courses</h1>
          </Link>
        </div>
      </div>
      <div className="w-full mt-20 mx-5">
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;
