"use client";
import projectConfig from "@/components/projectConfig";
import { UserContext, UserContextType } from "@/contexts/Usercontext";
import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";

// Import statements...

const InputField = () => {
  const [loading, setLoading] = React.useState(false);
  const [validationState, setValidationState] = useState("valid");
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = React.useState({
    password: "",
    passwordConfirm: "",
  });
  const router = useRouter();

  const { authenticated, validateToken } = useContext(
    UserContext
  ) as UserContextType;

  if (authenticated) {
    router.replace(`/workspace/home`);
  }
  const validateEmail = (email: string) => {
    if (email === "") return null;
    setValidationState(
      email?.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i)
        ? "valid"
        : "invalid"
    );
    setButtonDisabled(
      email?.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i) &&
        user.password === user.passwordConfirm
        ? false
        : true
    );
  };
  const validatePassword = (password: string) => {
    if (password === "") return null;

    const hasNumber = /\d/.test(password);
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isLongEnough = password.length >= 8;

    setValidationState(
      isLongEnough && hasNumber && hasLetter && hasSpecialChar
        ? "valid"
        : "invalid"
    );

    setButtonDisabled(
      validationState === "valid" &&
        hasNumber &&
        hasLetter &&
        hasSpecialChar &&
        isLongEnough
        ? false
        : true
    );
  };

  const handleChangeEmail = (value: string) => {
    validateEmail(value);
    setValidationState("valid");
    setEmail(value);
  };

  const handleChangePassword = (value: string) => {
    setUser({ ...user, password: value });
    validatePassword(value);
  };

  const handleChangePasswordConfirm = (value: string) => {
    setUser({ ...user, passwordConfirm: value });
    setButtonDisabled(
      validationState === "valid" && value === user.password ? false : true
    );
  };

  //name change input function handler

  const handleChangeFullName = (value: string) => {
    setFullName(value);
    setButtonDisabled(
      validationState === "valid" && value !== "" ? false : true
    );
  };

  const signUp = async () => {
    let errorMessage = "";

    if (
      email == null ||
      validationState === "invalid" ||
      user.password !== user.passwordConfirm ||
      fullName.trim() === ""
    ) {
      errorMessage = "Please try again";
      toast.error(errorMessage);
    } else {
      setLoading(true);
      setButtonDisabled(false);

      try {
        const response = await fetch(
          `${projectConfig.apiBaseUrl}/v2/register`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email,
              password: user.password,
              fullName: fullName,
            }),
          }
        );
        if (response.ok) {
          // Handle successful response
          const result = await response.json();
          localStorage.setItem("token", result.token);

          router.push("/auth/sign-in");
        } else {
          // Handle error response
          errorMessage = "Sign up failed. Please try again.";
          console.error(errorMessage, await response.text());
          toast.error(errorMessage);
        }
      } catch (error: unknown) {
        // Handle fetch error
        setLoading(false);
        setButtonDisabled(false);
        errorMessage = "Sign up failed. Please try again.";
        toast.error(errorMessage);
      }
    }
  };

  return (
    <>
      <Input
        onChange={(e) => handleChangeEmail(e.target.value)}
        type="email"
        label="Email"
        placeholder="wizard@wizardboards.co.uk"
        className="max-w-xs"
        isRequired
        isClearable
      />
      <Input
        onChange={(e) => handleChangeFullName(e.target.value)}
        isRequired
        isClearable
        type="text"
        label="Fullname"
        className="max-w-xs"
        placeholder="Enter your full name"
      />
      <Input
        onChange={(e) => handleChangePassword(e.target.value)}
        isRequired
        isClearable
        type="password"
        label="Password"
        className="max-w-xs"
        placeholder="Enter your password"
      />
      <p className="text-sm">
        <span className="text-red-500">*</span>
        <strong className="font-bold">At least: </strong>
        <span className="font-semibold">8</span> characters,
        <span className="font-semibold">1</span> number,
        <span className="font-semibold">1</span> special character
      </p>
      <Input
        onChange={(e) => handleChangePasswordConfirm(e.target.value)}
        isRequired
        isClearable
        type="password"
        label="Confirm Password"
        className="max-w-xs"
        placeholder="Re-enter your password"
      />

      <Button
        color="primary"
        className="max-w-xs"
        onPressEnd={signUp}
        disabled={buttonDisabled}
      >
        Register
      </Button>
    </>
  );
};

export default InputField;
