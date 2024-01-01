import Icon from '@/components/Icons'
import { Button } from '@nextui-org/react'
import Link from 'next/link'
import React from 'react'

const Socials = () => {
  return (
    <div className='flex flex-row flex-wrap-0 gap-2'>
         <Link href="https://github.com/kikiou1991" target='_blank' className='transfrom transition-transform hover:scale-125'>
          <Icon name="linkedIn" classname={"#E5EAF3"}/>
        </Link >
        <Link href="https://www.linkedin.com/in/gabor-adorjani-599666290/" target='_blank' className="transfrom transition-transform hover:scale-125"  >
          <Icon name="github" classname={"#E5EAF3"}/>
        </Link>
        <Link  href="" className="transfrom transition-transform hover:scale-125"  >
          <Icon name="discord" classname={"#E5EAF3"}/>
        </Link>
    </div>
  )
}

export default Socials