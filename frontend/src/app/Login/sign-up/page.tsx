import React from 'react'
import InputField from './InputField'
import { Button } from '@nextui-org/react'
import Icon from '@/components/Icons'
import Link from 'next/link'

const SignUp = () => {
  return (
    <div className='relaitve flex h-full flex-row'>
      
    <div className='basis-2/3 bg-[#172554]'>
      <Icon name='shape'/>
    </div>
    <div className='basis-1/3 flex flex-col justify-center items-center gap-2 py-5 px-5'>
      <div className='mt-5 mb-5 '>Welcome to Hogwarts</div>
      <InputField/>
      <div>
            Or
          </div>
          <Button
            color="primary" variant="light"
          ><Link href="/Login/sign-in">Sign-In</Link></Button>
    </div>
  
</div>

  )
}

export default SignUp