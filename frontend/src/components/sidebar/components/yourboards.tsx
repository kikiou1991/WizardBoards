'use client';
import {UserContext, UserContextType} from '@/contexts/Usercontext';
import {useContext, useEffect, useState} from 'react';
import MyModalNewBoard from '../sidebarmodal/new_board_modal';
import Link from 'next/link';
import Image from 'next/image';
import Icon from '@/components/Icons';
import {Dropdown, Button, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from '@nextui-org/react';

const YourBoards = () => {
  const {boards, deleteBoard, selectedWorkspace} = useContext(UserContext) as UserContextType;
  const context = useContext(UserContext);


  const handleDelete = async (boardUuid: string) => {
    try {
      console.log('boardUuid: ', boardUuid);
      await deleteBoard(context?.token, selectedWorkspace, boardUuid);
      
    } catch (error) {
      console.error('Error deleting board: ', error);
    }
  }

  return (
    <div>
      <div className='flex flex-row px-2 pt-2'>
        <h2 className='font-semibold flex-grow'>Your Boards</h2>
        <MyModalNewBoard />
      </div>
      <div className='pt-2 flex flex-col'>
        {boards && boards.length > 0 ? (
          <ul className='pl-2 '>
          {boards.map((board: any) => {
              
              return <li className='py-1 group/item hover:bg-secondaryBG flex flex-row ' key={board.uuid || board.id}>
                <div className='flex flex-row gap-1 items-center flex-nowrap'>
                  <Image src="" width={20} height={20} alt='board-background'/>
                  <Link href=''>{board.name}</Link>
                </div>
                <div className='ml-auto flex group/edit invisible group-hover/item:visible'>
                  <Dropdown
                      className='bg-background text-[#E5EAF3]'
                      placement='bottom-start'
                      classNames={{
                        base: "before:bg-background",
                        content: "py-1 px-1 border border-default-200 bg-background dark:from-default-50 dark:to-black"
                      }}
                      >
                    <DropdownTrigger>
                      <Button className='bg-inherit hover:bg-secondaryBG' size='sm' isIconOnly>
                        <Icon name='verticalDots' />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu className='bg-background'>
                      <DropdownSection className='align-center'>
                        <DropdownItem className='data-[hover=true]:bg-secondaryBG text-center font-bold'>{board.name}</DropdownItem>
                      </DropdownSection>
                      <DropdownSection>
                        <DropdownItem key="Close board" className='data-[hover=true]:bg-inherit flex flex-row text-center' >
                          <Button onPress={() => handleDelete(board.uuid)} color='danger' size="md" >Close</Button>
                        </DropdownItem>
                      </DropdownSection>
                    </DropdownMenu>
                  </Dropdown>
                  <Button className='bg-inherit group-hover/edit:transfrom transition-transform hover:scale-125 group-hover:bg-secondaryBG' size='sm' isIconOnly>
                    <Icon name='star'/>
                  </Button>
                </div>
                </li>;
            })} 
           
          </ul>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};


                 

               

export default YourBoards;
