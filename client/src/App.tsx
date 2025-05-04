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
