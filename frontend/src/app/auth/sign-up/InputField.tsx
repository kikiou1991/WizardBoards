'use client';
import {Button, Input} from '@nextui-org/react';
import {useRouter} from 'next/navigation';
import React, {useState} from 'react';
import toast from 'react-hot-toast';

// Import statements...

const InputField = () => {
  const [loading, setLoading] = React.useState(false);
  const [validationState, setValidationState] = useState('valid');
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [email, setEmail] = useState('');
  const [user, setUser] = React.useState({
    password: '',
    passwordConfirm: '',
  });

  const validateEmail = (email: string) => {
    if (email === '') return null;
    setValidationState(email?.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i) ? 'valid' : 'invalid');
    setButtonDisabled(email?.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i) && user.password === user.passwordConfirm ? false : true);
  };

  const handleChangeEmail = (value: any) => {
    setValidationState('valid');
    setEmail(value);
    validateEmail(value);
  };

  const handleChangePassword = (value: string) => {
    setUser({...user, password: value});
    setButtonDisabled(validationState === 'valid' && value === user.passwordConfirm ? false : true);
  };

  const handleChangePasswordConfirm = (value: string) => {
    setUser({...user, passwordConfirm: value});
    setButtonDisabled(validationState === 'valid' && value === user.password ? false : true);
  };
  const router = useRouter();

  const signUp = async () => {
    let errorMessage = '';

    if (email == null || validationState === 'invalid' || user.password !== user.passwordConfirm) {
      errorMessage = 'Please try again';
      alert(errorMessage);
    } else {
      setLoading(true);
      setButtonDisabled(false);
      alert('All done');

      try {
        const response = await fetch('https://gadorjani.co.uk/api/signup', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            email: email,
            password: user.password,
          }),
        });
        if (response.ok) {
          // Handle successful response
          router.push('/auth/sign-in');
        } else {
          // Handle error response
          errorMessage = 'Sign up failed. Please try again.';
          console.error(errorMessage, await response.text());
          toast.error(errorMessage);
        }
      } catch (error: any) {
        // Handle fetch error
        setLoading(false);
        setButtonDisabled(false);
        errorMessage = 'Sign up failed. Please try again.';
        console.error(errorMessage, error.message);
        toast.error(errorMessage);
      }
    }
  };

  return (
    <>
      <Input onChange={(e) => handleChangeEmail(e.target.value)} type='email' label='Email' placeholder='junior@nextui.org' className='max-w-xs' isRequired isClearable />
      <Input onChange={(e) => handleChangePassword(e.target.value)} isRequired isClearable type='password' label='Password' className='max-w-xs' placeholder='Enter your password' />
      <Input onChange={(e) => handleChangePasswordConfirm(e.target.value)} isRequired isClearable type='password' label='Confirm Password' className='max-w-xs' placeholder='Re-enter your password' />

      <Button color='primary' className='max-w-xs' onPressEnd={signUp} disabled={buttonDisabled}>
        Register
      </Button>
    </>
  );
};

export default InputField;
