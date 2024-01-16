import { Avatar, AvatarGroup, Button } from '@nextui-org/react'
import React from 'react'
import Icon from '../Icons'

const BoardNav = () => {
  return (
    <div className='flex flex-row items-center justify-start flex-wrap'>
        <div className=' ml-2 mr-auto text-foreground flex  items-center '>
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
        <div className='flex  px-2 py-2 mr-2 ml-auto'>
            <AvatarGroup size='sm'>
                <Avatar  src='https://i.pravatar.cc/150?u=a042581f4e29026704d' />
                <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
                <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
                <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
                <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
            </AvatarGroup>
        </div>  
    </div>  
  )
}

export default BoardNav