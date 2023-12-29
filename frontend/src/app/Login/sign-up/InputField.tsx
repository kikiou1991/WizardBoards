import { Input, Button } from '@nextui-org/react'
import React from 'react'

const InputField = () => {
  return (
    <>
      <Input
      
      type="email"
      label="Email"
      placeholder="junior@nextui.org"
      className="max-w-xs"
      isRequired
    />
      <Input
      isRequired      
      type='password'
      label="Password"
      className='max-w-xs'
      placeholder='Enter your password'
      />
      <Input
      isRequired      
      type='password'
      label="Password"
      className='max-w-xs'
      placeholder='Re-enter your password'
      />
      
        
      <Button
            color='primary'
            className='max-w-xs'
            
            >
              Register
      </Button>
     </>
  )
}

export default InputField