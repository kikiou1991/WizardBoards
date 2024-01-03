import React from 'react'
import InputField from './InputField'
import { Button } from '@nextui-org/react'
import Icon from '@/components/Icons'
import Link from 'next/link'

const SignUp = () => {
  return (
    <div className='relaitve flex flex-col md:flex-row h-full'>
      <div className='md:basis-2/3 hidden md:flex bg-gradient-to-r from-[#602ee4] to-[#14a0eb]'>
        <Icon name='shape'/>
      </div>
      <div className='md:basis-1/3 w-full flex flex-col justify-center items-center gap-2 py-5 px-5 bg-gradient-to-r from-[#66a6db] to-[#c9d7e7]'>
        <div className='mt-5 mb-5'>Welcome to Hogwarts</div>
        <InputField/>
        <div className='flex flex-col items-center'>
          <div>
            Or
          </div>
          <div>
            <Button color="primary" variant="light">
              <Link href="/auth/sign-in">Sign-In</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
