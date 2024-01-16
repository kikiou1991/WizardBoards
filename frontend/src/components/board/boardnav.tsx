import { Avatar, AvatarGroup, Button } from '@nextui-org/react'
import React from 'react'
import Icon from '../Icons'

const BoardNav = () => {
  return (
    <div className='flex flex-row justify-start flex-wrap'>
        <div className=' text-foreground flex  items-center '>
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
        {/* <div className='flex flex-grow'>
            
        </div> */}
        <div className='flex ml-auto px-2 py-1 mr-2'>
            <AvatarGroup size='sm'>
                <Avatar as='button'  className='transition-transform p'  src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
                <Avatar as='button'  className='transition-transform p'  src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                <Avatar as='button'  className='transition-transform p'  src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
                <Avatar as='button'  className='transition-transform p'  src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
                <Avatar as='button'  className='transition-transform p'  src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
                <Avatar as='button'  className='transition-transform p'  src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
            </AvatarGroup>
        </div>  
    </div>  
  )
}

export default BoardNav