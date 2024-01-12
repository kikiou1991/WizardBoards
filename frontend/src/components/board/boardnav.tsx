import { Avatar, Button } from '@nextui-org/react'
import React from 'react'
import Icon from '../Icons'

const BoardNav = () => {
  return (
    <div className='flex flex-row items-center'>
        <div className=' ml-2 mr-auto text-foreground flex flex-grow-0 items-center '>
            <div className='px-3 py-0'>
                {"Current Board"}
            </div>
            <Button className='px-2 bg-inherit transfrom transition-transform hover:scale-125' isIconOnly>
                <Icon name="star" />
            </Button>
            <Button className='px-2 bg-inherit transfrom transition-transform hover:scale-125' isIconOnly>
                <Icon name="groupVis" />
            </Button>

        </div>
        <div className='flex flex-grow'>
            
        </div>
        <div className='flex flex-grow-0 px-2 py-2 mr-2 ml-auto'>
            <Avatar isBordered as='button' className='transition-transform p' color='primary'  size='sm' src='https://i.pravatar.cc/150?u=a042581f4e29026704d' />
        </div>  
    </div>  
  )
}

export default BoardNav