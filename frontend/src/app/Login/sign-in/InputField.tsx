"use client";
import { Button, Input } from '@nextui-org/react';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const InputField = () => {
  
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [inputValue, setInputValue] = React.useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  

  const handleEmailChange = (e: any) => {
    const newEmail = e.target.value;
    setInputValue({
      ...inputValue,
      email: newEmail,
    });
    updateButtonState(newEmail, inputValue.password);
  };

  const handlePasswordChange = (e: any) => {
    const newPassword = e.target.value;
    setInputValue({
      ...inputValue,
      password: newPassword,
    });
    updateButtonState(inputValue.email, newPassword);
  };

  const updateButtonState = (newEmail: string, newPassword: string) => {
    // Enable the button only if both email and password are not empty
    setButtonDisabled(!(newEmail.trim() !== '' && newPassword.trim() !== ''));
  };

  const handleLogin = async (e:any) => {
    
    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: inputValue.email,
          password: inputValue.password,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("result is good", result)
        if (result.success) {
          // Successful login
          console.log("succes")
          router.replace("http://localhost:3000/wizardboards/Main/home");
          
        } else {
          // Incorrect credentials
          console.log("the response was not succesful")
          alert(result.message);
        }
      } else {
        // Handle other error responses
        const result = await response.json();
        alert("something has gone wrong");
      }
    } catch (error: any) {
      // Handle fetch error
      console.error("Failed to log in user", error.message);
      alert("Failed to log in. Please try again.");
    } finally {
      // Reset input fields
      setInputValue({
        email: "",
        password: "",
      });
    }
    
  };

  return (
    <>
      <Input
        onChange={(e) => handleEmailChange(e)}
        type="email"
        label="Email"
        placeholder="junior@nextui.org"
        className="max-w-xs"
        isRequired
      />
      <Input
        onChange={(e) => handlePasswordChange(e)}
        isRequired
        type='password'
        label="Password"
        className='max-w-xs'
        placeholder='Enter your password'
      />

      <Button
        color='primary'
        className='max-w-xs'
        isDisabled={buttonDisabled}
        onPressEnd={handleLogin}
      >
        Login
      </Button>
    </>
  );
};

export default InputField;
