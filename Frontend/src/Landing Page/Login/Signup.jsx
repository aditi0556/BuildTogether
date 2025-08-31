"use client";
import React from "react";
import Label from "@/components/ui/label";
import Input from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { MoveLeft } from "lucide-react";
import { useEffect,useState } from "react";
import axios from "axios";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
export default function Signup() {
  const navigate=useNavigate();
  const [errorMsg, setErrorMsg] = useState("");

  const showError = (msg) => {
    setErrorMsg(msg);
    setTimeout(() => setErrorMsg(""), 3000); // clears after 3 seconds
  };
  const [formdata,setFormdata]=useState({
    firstName:"",
    lastName:"",
    username:"",
    email:"",
    password:"",
  });
  async function addUser(){
    console.log(formdata);
    try{
      const res=await axios.post("/v1/users/signup",formdata);
      console.log(res);
      navigate("/");
    }
    catch(err){
      const msg = err.response.data.error || "Signup failed";
      showError(msg);
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
    addUser();
  };
  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.id]: e.target.value });
  };

  return (
    <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 mt-20  md:rounded-2xl md:p-8 dark:bg-black">
      {errorMsg && (
        <div className="mb-4 text-sm text-red-600 dark:text-red-400 transition-opacity duration-300">
          {errorMsg}
        </div>
      )}
      <span
        className="text-blue-600 hover:cursor-pointer"
        onClick={() => navigate("/")}
      >
        <MoveLeft />
      </span>
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        Welcome
      </h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
        Already have an account?{" "}
        <span
          className="text-blue-600 hover:cursor-pointer"
          onClick={() => navigate("/login")}
        >
          Login
        </span>
      </p>
      <form className="my-8" onSubmit={handleSubmit}>
        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <LabelInputContainer>
            <Label htmlFor="firstName">First name</Label>
            <Input
              id="firstName"
              placeholder="Tyler"
              type="text"
              required
              onChange={handleChange}
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastName">Last name</Label>
            <Input
              id="lastName"
              placeholder="Durden"
              type="text"
              required
              onChange={handleChange}
            />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            placeholder="username"
            type="username"
            minLength={4}
            pattern="^[a-zA-Z0-9_]+$"
            required
            onChange={handleChange}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            placeholder="projectmayhem@fc.com"
            type="email"
            required
            onChange={handleChange}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            required
            minLength={5}
            pattern="^[a-zA-Z0-9_]+$"
            placeholder="••••••••"
            type="password"
            onChange={handleChange}
          />
        </LabelInputContainer>
        <button
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
          type="submit"
        >
          Sign up &rarr;
          <BottomGradient />
        </button>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
