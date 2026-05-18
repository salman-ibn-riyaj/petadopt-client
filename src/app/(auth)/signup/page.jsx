"use client";

import {
  Button,
  Card,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  Separator,
  TextField,
  toast,
} from "@heroui/react";
import { Eye, EyeSlash } from "@gravity-ui/icons";
import { InputGroup } from "@heroui/react";
import { useState } from "react";
import { redirect } from "next/navigation";
// import { authClient } from "@/lib/auth-client";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";

export default function SignUpPage() {
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());
    console.log(userData);

    const { data, error } = await authClient.signUp.email({
      name: userData.name, // required
      email: userData.email, // required
      password: userData.password, // required
      image: userData.image,
    });

    if (data) {
      alert("Sign up success!");
      redirect("/");
    }
    if (error) {
      toast("Sign Up failed " + error.message);
    }
  };

  const googleSignIn = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <div className="w-full min-h-screen px-4 py-8 flex items-center justify-center bg-gray-50 dark:bg-[#0d1117] transition-colors">
      <Card className="rounded-2xl max-w-xl w-full mx-auto p-4 sm:p-6 md:p-8 border border-gray-200 dark:border-[#30363d] bg-white dark:bg-[#161b22] shadow-md dark:shadow-none">
        <div>
          <div className="text-center space-y-2 my-3 sm:my-5">
            <h2 className="text-2xl font-bold text-[#3B7597] dark:text-[#6FD1D7]">Create Account</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">short your adventure with wanderlust</p>
          </div>
        </div>
        <Form
          className="flex w-full flex-col gap-4 sm:gap-5"
          onSubmit={onSubmit}
        >
          <TextField
            isRequired
            name="name"
            validate={(value) => {
              if (value.length < 3) {
                return "Name must be at least 3 characters";
              }
              return null;
            }}
          >
            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Name</Label>
            <Input placeholder="Enter your name" className="w-full text-gray-800 dark:text-gray-200" />
            <FieldError className="text-xs text-rose-500 mt-1" />
          </TextField>

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
            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</Label>
            <Input placeholder="Enter Your Email" className="w-full text-gray-800 dark:text-gray-200" />
            <FieldError className="text-xs text-rose-500 mt-1" />
          </TextField>

          {/* Password Field */}
          <TextField
            isRequired
            placeholder='Enter Your Password'
            minLength={6}
            name="password"
            type="password"
            onChange={(value) => setPasswordValue(value)} 
            validate={(value) => {
              if (value.length < 6) {
                return "Password must be at least 6 characters";
              }
              if (!/[A-Z]/.test(value)) {
                return "Password must contain at least one uppercase letter";
              }
              if (!/[a-z]/.test(value)) {
                return "Password must contain at least one lowercase letter";
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
              Must be at least 6 characters with 1 uppercase and 1 lowercase letter
            </Description>
            <FieldError className="text-xs text-rose-500 mt-1" />
          </TextField>

          {/* Confirm Password Field */}
          <TextField
            isRequired
            placeholder='Confirm Password'
            name="confirmPassword"
            type="password"
            validate={(value) => {
              if (value !== passwordValue) {
                return "Password & Confirm Password must be same";
              }
              return null;
            }}
          >
            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Confirm Password
            </Label>
            <InputGroup className="focus-within:border-[#3B7597] dark:focus-within:border-[#6FD1D7]">
              <InputGroup.Input
                className="w-full text-gray-800 dark:text-gray-200"
                type={isConfirmVisible ? "text" : "password"}
              />
              <InputGroup.Suffix className="pr-1">
                <Button
                  isIconOnly
                  aria-label={isConfirmVisible ? "Hide password" : "Show password"}
                  size="sm"
                  variant="ghost"
                  className="text-gray-400 hover:text-[#3B7597] dark:hover:text-[#6FD1D7]"
                  onPress={() => setIsConfirmVisible(!isConfirmVisible)}
                >
                  {isConfirmVisible ? (
                    <Eye className="size-4" />
                  ) : (
                    <EyeSlash className="size-4" />
                  )}
                </Button>
              </InputGroup.Suffix>
            </InputGroup>
            <FieldError className="text-xs text-rose-500 mt-1" />
          </TextField>

          <TextField name="image">
            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Image</Label>
            <Input placeholder="Image Url" className="w-full text-gray-800 dark:text-gray-200" />
            <FieldError className="text-xs text-rose-500 mt-1" />
          </TextField>

          <div className="flex justify-center gap-2 mt-2">
            <Button
              className="w-full rounded-xl text-sm font-semibold text-white bg-[#3B7597] hover:bg-[#2e5b77] dark:bg-[#6FD1D7] dark:text-gray-950 dark:hover:bg-[#5bc0c6] active:scale-[0.98] transition-all py-2.5 shadow-sm shadow-[#3B7597]/10"
              type="submit"
            >
              Sign Up
            </Button>
          </div>

          <div className="my-1">
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <Link className="text-[#3B7597] dark:text-[#6FD1D7] font-semibold hover:underline" href={"/login"}>
                Log in
              </Link>
            </p>
          </div>
        </Form>
        
        <div className="flex items-center justify-center gap-3 my-4 w-full">
          <div className="flex-1 border-t border-gray-200 dark:border-zinc-700"></div>
          <div className="whitespace-nowrap text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wider">or sign in with</div>
          <div className="flex-1 border-t border-gray-200 dark:border-zinc-700"></div>
        </div>

        <Button
          className="w-full rounded-xl text-sm font-semibold border border-gray-200 dark:border-[#30363d] bg-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800 active:scale-[0.98] transition-all py-2.5"
          variant="outline"
          onClick={googleSignIn}
        >
          <FcGoogle className="text-lg" /> Sign In with Google
        </Button>
      </Card>
    </div>
  );
}