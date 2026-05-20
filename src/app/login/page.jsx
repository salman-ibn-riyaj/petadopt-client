"use client";
import { authClient } from "@/lib/auth-client";
// import { authClient } from "@/lib/auth-client";
import { Eye, EyeSlash } from "@gravity-ui/icons";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  InputGroup,
  Label,
  TextField,
  toast,
} from "@heroui/react";
import Link from "next/link";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const userData = Object.fromEntries(formData.entries());
    console.log(userData);

    const { data, error } = await authClient.signIn.email({
      email: userData.email, // required
      password: userData.password, // required
      rememberMe: true,
      callbackURL: "/",
    });

    if (data) {
      toast("Log in success");
    }
    if (error) {
      toast("Log in failed" + error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
    });
  };
  return (
    <div className="p-6 max-w-xl mx-auto border border-gray-200 dark:border-[#30363d] bg-white dark:bg-[#161b22] rounded-2xl shadow-sm mt-10 flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-6 text-[#3B7597] dark:text-[#6FD1D7]">
        Log In here
      </h2>

      <div>
        <Form className="flex w-96 flex-col gap-5" onSubmit={onSubmit}>
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address";
              }
              return null;
            }}
          >
            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </Label>
            <Input
              placeholder="Enter your email"
              className="w-full bg-transparent border-gray-200 focus-within:border-[#3B7597] dark:focus-within:border-[#6FD1D7]"
            />
            <FieldError className="text-xs text-rose-500 mt-1" />
          </TextField>

          <TextField
            isRequired
            placeholder="Enter your password"
            minLength={8}
            name="password"
            type="password"
            validate={(value) => {
              if (value.length < 8) {
                return "Password must be at least 8 characters";
              }
              if (!/[A-Z]/.test(value)) {
                return "Password must contain at least one uppercase letter";
              }
              if (!/[0-9]/.test(value)) {
                return "Password must contain at least one number";
              }
              return null;
            }}
          >
            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </Label>
            <InputGroup className="focus-within:border-[#3B7597] dark:focus-within:border-[#6FD1D7]">
              <InputGroup.Input
                className="w-full text-gray-800 dark:text-gray-200"
                type={isVisible ? "text" : "password"}
              />
              <InputGroup.Suffix className="pr-1">
                <Button
                  isIconOnly
                  aria-label={isVisible ? "Hide password" : "Show password"}
                  size="sm"
                  variant="ghost"
                  className="text-gray-400 hover:text-[#3B7597] dark:hover:text-[#6FD1D7]"
                  onPress={() => setIsVisible(!isVisible)}
                >
                  {isVisible ? (
                    <Eye className="size-4" />
                  ) : (
                    <EyeSlash className="size-4" />
                  )}
                </Button>
              </InputGroup.Suffix>
            </InputGroup>
            <Description className="text-xs text-gray-400 mt-1">
              Must be at least 8 characters with 1 uppercase and 1 number
            </Description>
            <FieldError className="text-xs text-rose-500 mt-1" />
          </TextField>

          <div className="flex justify-center gap-2 mt-2">
            <Button
              className="w-full rounded-xl text-sm font-semibold text-white bg-[#3B7597] hover:bg-[#2e5b77] dark:bg-[#6FD1D7] dark:text-gray-950 dark:hover:bg-[#5bc0c6] active:scale-[0.98] transition-all py-2.5 shadow-sm shadow-[#3B7597]/10"
              type="submit"
            >
              Login
            </Button>
          </div>

          <Button
            className="w-full rounded-xl text-sm font-semibold border border-gray-200 dark:border-[#30363d] bg-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800 active:scale-[0.98] transition-all py-2.5"
            variant="outline"
            onClick={handleGoogleSignIn}
          >
            <FcGoogle className="text-lg" /> Sign In with Google
          </Button>

          <p className="text-center">
            Don't hava an account?{" "}
            <Link className="underline text-blue-500" href={"/signup"}>
              Register
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
