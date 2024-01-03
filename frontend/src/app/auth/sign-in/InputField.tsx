'use client';
import {Button, Input} from '@nextui-org/react';
import {useRouter} from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';

const InputField = () => {
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [inputValue, setInputValue] = React.useState({
    email: '',
    password: '',
  });
  const router = useRouter();

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
    setButtonDisabled(!(newEmail.trim() !== '' && newPassword.trim() !== ''));
  };

  const handleLogin = async (e: any) => {
    if (inputValue.email === '') {
      toast.error('Please enter your email');
      return;
    }
    if (inputValue.password === '') {
      toast.error('Please enter your password');
      return;
    }

    try {
      const response = await fetch('https://gadorjani.co.uk/api/login/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: inputValue.email,
          password: inputValue.password,
        }),
      });
      console.log('result is good', inputValue);

      if (response.ok) {
        const result = await response.json();
        console.log('result is good', result);
        if (result.success) {
          // Successful login

          console.log('success');

          //store the token in local storage
          localStorage.setItem('token', result.token);

          router.push('/workspace/home');
        } else {
          // Incorrect credentials
          console.log('the response was not succesful');
          toast.error(result.message);
        }
      } else {
        // Handle other error responses
        const result = await response.json();
      }
    } catch (error: any) {
      // Handle fetch error
      console.error('Failed to log in user', error.message);
      toast.error('Failed to log in user');
    } finally {
      // Reset input fields
      setInputValue({
        email: '',
        password: '',
      });
    }
  };
  console.log('input value', inputValue);
  return (
    <>
      <Input value={inputValue?.email} onValueChange={(e) => handleEmailChange(e)} type='email' label='Email' placeholder='junior@nextui.org' className='max-w-xs' isRequired />
      <Input value={inputValue?.password} onValueChange={(e) => handlePasswordChange(e)} isRequired type='password' label='Password' className='max-w-xs' placeholder='Enter your password' />

      <Button color='primary' className='max-w-xs' isDisabled={buttonDisabled} onPress={handleLogin}>
        Login
      </Button>
    </>
  );
};

export default InputField;