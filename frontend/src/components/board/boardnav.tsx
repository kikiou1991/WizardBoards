"use client"
import { Avatar, AvatarGroup, Button } from '@nextui-org/react'
import React, { useContext, useState } from 'react'
import Icon from '../Icons'
import { UserContext, UserContextType } from '@/contexts/Usercontext';

const BoardNav = () => {
    const {selectedBoard, boards, setIsFavorite} = useContext(UserContext) as UserContextType;
    const [isHovered, setIsHovered] = useState(false);
    const [starred, setStarred] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
      };
    
    const handleMouseLeave = () => {
        setIsHovered(false);
      };
    
      const setFavorite = () => {
        setStarred(!starred);
        setIsHovered(false);
        setIsFavorite(!starred);
         // Reset hover state when clicked
    };
    

    
    const currentBoard = boards.find((board) => board.uuid === selectedBoard);

  return (
    <div className='flex flex-row items-center justify-start flex-wrap'>
        <div className=' ml-2 mr-auto text-foreground flex  items-center '>
            <div className='px-3 py-0'>
                {currentBoard?.name}
            </div>
            <Button
                className={`data-${isHovered ? 'hover=true' : 'hover=false'}:bg-secondaryBG px-2 bg-inherit transfrom transition-transform hover:scale-125`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={setFavorite}
                isIconOnly>
                 {starred ? (
                        <Icon name={isHovered ? 'star' : 'starYellow'} />
                    ) : (
                        <Icon name={isHovered ? 'starYellow' : 'star'} />
                    )}
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