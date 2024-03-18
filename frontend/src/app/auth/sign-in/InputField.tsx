"use client";
import projectConfig from "@/components/projectConfig";
import { UserContext, UserContextType } from "@/contexts/Usercontext";
import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import toast from "react-hot-toast";

const InputField = () => {
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [inputValue, setInputValue] = React.useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const { authenticated, setAuthenticated, setToken } = useContext(
    UserContext
  ) as UserContextType;
  if (authenticated) {
    router.replace(`/workspace/home`);
  }
  const handleEmailChange = (e: any) => {
    const newEmail = e;
    setInputValue({
      ...inputValue,
      email: newEmail,
    });
    updateButtonState(newEmail, inputValue.password);
  };

  const handlePasswordChange = (e: any) => {
    const newPassword = e;
    setInputValue({
      ...inputValue,
      password: newPassword,
    });
    updateButtonState(inputValue.email, newPassword);
  };

  const updateButtonState = (newEmail: string, newPassword: string) => {
    // Enable the button only if both email and password are not empty
    setButtonDisabled(!(newEmail.trim() !== "" && newPassword.trim() !== ""));
  };

  const handleLogin = async (e: any) => {
    if (inputValue.email === "") {
      toast.error("Please enter your email");
      return;
    }
    if (inputValue.password === "") {
      toast.error("Please enter your password");
      return;
    }

    try {
      const response = await fetch(`${projectConfig.apiBaseUrl}/v2/login/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          email: inputValue.email,
          password: inputValue.password,
        }),
      });

      if (response.ok) {
        const result = await response.json();

        if (result.success) {
          // Successful login

          //store the token in local storage
          localStorage.setItem("token", result.token);
          setAuthenticated(true);
          setToken(result.token);

          router.push("/workspace/home");
        } else {
          // Incorrect credentials
          toast.error(result.message);
        }
      } else {
        // Handle other error responses
        const result = await response.json();
      }
    } catch (error: any) {
      // Handle fetch error
      console.error("Failed to log in user", error.message);
      toast.error("Failed to log in user");
    }
  };
  return (
    <>
      <Input
        value={inputValue?.email}
        onValueChange={(e) => handleEmailChange(e)}
        type="email"
        label="Email"
        placeholder="junior@nextui.org"
        className="max-w-xs"
        isRequired
      />
      <Input
        value={inputValue?.password}
        onValueChange={(e) => handlePasswordChange(e)}
        isRequired
        type="password"
        label="Password"
        className="max-w-xs"
        placeholder="Enter your password"
      />

      <Button
        color="primary"
        className="max-w-xs my-2 hover:bg-blue-700  "
        isDisabled={buttonDisabled}
        onPress={handleLogin}
      >
        Login
      </Button>
    </>
  );
};

export default InputField;
