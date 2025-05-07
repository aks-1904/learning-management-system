import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import Hero from "./pages/student/Hero";
import MainLayout from "./layout/MainLayout";
import Auth from "./pages/Auth";
import Courses from "./pages/student/Courses";
import MyLearning from "./pages/student/MyLearning";
import Profile from "./pages/student/Profile";
import { Provider } from "react-redux";
import { appStore } from "@/app/store";
import Dashboard from "./pages/admin/Dashboard";
import CoursesAdmin from "./pages/admin/course/Courses";
import Sidebar from "./pages/admin/Sidebar";
import AddCourse from "./pages/admin/course/AddCourse";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: (
          <>
            <Hero />
            <Courses />
          </>
        ),
      },
      {
        path: "/login",
        element: <Auth />,
      },
      {
        path: "/register",
        element: <Auth />,
      },
      {
        path: "/my-learning",
        element: <MyLearning />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },

      // Instructor routes
      {
        path: "/instructor",
        element: <Sidebar />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "courses",
            element: <CoursesAdmin />,
          },
          {
            path: "create-course",
            element: <AddCourse />,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return (
    <Provider store={appStore}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <main>
          <RouterProvider router={appRouter} />
        </main>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
