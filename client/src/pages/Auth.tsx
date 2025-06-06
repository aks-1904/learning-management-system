import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "@/features/api/authapi";
import { LoginForm, RegisterForm } from "@/types/form";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Auth = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [registerInput, setRegisterInput] = useState<RegisterForm>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loginInput, setLoginInput] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const [
    registerUser,
    {
      data: registerData,
      error: registerErr,
      isLoading: registerLoading,
      isSuccess: registerSuccess,
    },
  ] = useRegisterUserMutation();
  const [
    loginUser,
    {
      data: loginData,
      error: loginErr,
      isLoading: loginLoading,
      isSuccess: loginSuccess,
    },
  ] = useLoginUserMutation();

  const valueChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    let { name, value } = e.target;

    if (type === "register")
      setRegisterInput({ ...registerInput, [name]: value });
    else if (type === "login") setLoginInput({ ...loginInput, [name]: value });
  };

  const registerHandler = async () => {
    if (registerInput.password === registerInput.confirmPassword) {
      await registerUser(registerInput);
    } else {
      toast.error("Password not match");
    }
  };

  const loginHandler = async () => {
    await loginUser(loginInput);
  };

  useEffect(() => {
    if (registerSuccess && registerData) {
      toast.success(registerData?.message || "Register successfully");
      setRegisterInput({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    }
    if (registerErr) {
      const message =
        "data" in registerErr
          ? (registerErr.data as { message?: string })?.message
          : "Registration Failed";
      toast.error(message);
    }
    if (loginSuccess && loginData) {
      toast.success(loginData.message || "Login successfully");
      setLoginInput({ email: "", password: "" });
      navigate("/", {
        replace: true,
      });
    }
    if (loginErr) {
      const message =
        "data" in loginErr
          ? (loginErr.data as { message?: string })?.message
          : "Login Failed";
      toast.error(message);
    }
  }, [
    loginData,
    loginErr,
    loginSuccess,
    registerData,
    registerErr,
    registerSuccess,
    navigate,
  ]);

  return (
    <div className="flex justify-center items-center h-screen">
      <Tabs
        defaultValue={pathname === "/login" ? "login" : "register"}
        className="w-[400px]"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="register">Register</TabsTrigger>
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>
        <TabsContent value="register">
          <Card>
            <CardHeader>
              <CardTitle>Register</CardTitle>
              <CardDescription>
                Create a new account and explore courses with us. Click on
                register when you're done
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  value={registerInput.name}
                  onChange={(e) => valueChangeHandler(e, "register")}
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Eg. Akshay Sharma"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  value={registerInput.email}
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Eg. ak.19@gmail.com"
                  onChange={(e) => valueChangeHandler(e, "register")}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  value={registerInput.password}
                  onChange={(e) => valueChangeHandler(e, "register")}
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Eg. abc"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  value={registerInput.confirmPassword}
                  type="password"
                  id="confirmPassword"
                  placeholder="Eg. abc"
                  name="confirmPassword"
                  onChange={(e) => valueChangeHandler(e, "register")}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                disabled={registerLoading}
                className="w-full cursor-pointer"
                onClick={registerHandler}
              >
                {registerLoading ? (
                  <>
                    <Loader2 className="animate-spin mr-2 h-4 w-4" /> Please
                    Wait...
                  </>
                ) : (
                  "Register"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Welcome Back!!</CardTitle>
              <CardDescription>
                Login and start learining again with us...
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  value={loginInput.email}
                  type="email"
                  id="email"
                  placeholder="Eg. ak.19@gmail.com"
                  name="email"
                  onChange={(e) => valueChangeHandler(e, "login")}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  value={loginInput.password}
                  type="password"
                  id="password"
                  placeholder="Eg. abc"
                  name="password"
                  onChange={(e) => valueChangeHandler(e, "login")}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                disabled={loginLoading}
                className="w-full cursor-pointer"
                onClick={loginHandler}
              >
                {loginLoading ? (
                  <>
                    <Loader2 className="animate-spin mr-2 h-4 w-4" /> Please
                    Wait...
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Auth;
