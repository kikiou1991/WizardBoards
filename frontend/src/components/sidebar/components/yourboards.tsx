'use client';
import {UserContext, UserContextType} from '@/contexts/Usercontext';
import {useContext, useEffect, useState} from 'react';
import MyModalNewBoard from '../sidebarmodal/new_board_modal';

import Link from 'next/link';
import Image from 'next/image';
import Icon from '@/components/Icons';
import {Dropdown, Button, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from '@nextui-org/react';

const YourBoards = () => {
  const {boards, deleteBoard, selectedWorkspace, setSelectedBoard, selectedBoard, updateBoard, token, favorites} = useContext(UserContext) as UserContextType;
  const context = useContext(UserContext);
  const [board, setBoard] = useState<any>(null);



  const handleBoardChange = (boardId: string) => {
    setBoard(boardId);
    setSelectedBoard(boardId);
    
  }


  const handleDelete = async (boardUuid: string) => {
    try {
      console.log('boardUuid: ', boardUuid);
      await deleteBoard(context?.token, selectedWorkspace, boardUuid);
      
    } catch (error) {
      console.error('Error deleting board: ', error);
    }
  }
  const handleStar = async (boardUuid: string) => {
    try {
      const selectedBoard = boards.find((board) => board.uuid === boardUuid);
      console.log('boardUuid: ', boardUuid);
      console.log('selectedBoard: ', selectedBoard?.isStared);

      await updateBoard(token, boardUuid, { isStared: !selectedBoard?.isStared, name: selectedBoard?.name});
    } catch (error) {}
  };
  

  return (
    <div>
      <div className='flex flex-row px-2 pt-2'>
        <h2 className='font-semibold flex-grow'>Your Boards</h2>
        <MyModalNewBoard />
      </div>
      <div className='pt-2 flex flex-col'>
        {boards && boards.length > 0 ? (
          <ul className=' '>
          {boards.map((board: any) => {
              
              return <li 
              className={`px-2 group/item h-8 hover:bg-secondaryBG flex flex-row  ${selectedBoard === board.uuid ? 'bg-secondaryBG' : 'bg-background'}`}
                  key={board.uuid || board.id}
                  onClick={() => handleBoardChange(board.uuid)}
                  >
                    <div className='flex flex-row gap-2 items-center flex-nowrap'>
                      <Image className='rounded' src={board.imageLink} width={26} height={20} alt='board-background'/>
                      <Link href='' className='text-nowarp'>
                        {board?.name?.length > 12 ? `${board.name.substring(0, 12)}...` : board.name}
                      </Link>
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
                            <DropdownItem key="delete" endContent={<Icon name="bin"/>}>
                              <Button className='bg-inherit hover:bg-transparent' onPress={() => handleDelete(board.uuid)}>Delete Board by clicking the red button</Button>
                              
                            </DropdownItem>
                              
                          </DropdownSection>
                          <DropdownSection>
                            <DropdownItem key="Close board" className='data-[hover=true]:bg-inherit flex flex-row text-center' >
                              <Button onPress={() => handleDelete(board.uuid)} color='danger' size="md" >Close Board</Button>
                            </DropdownItem>
                          </DropdownSection>
                        </DropdownMenu>
                      </Dropdown>
                      {board.isStared ? (
                        <Button onPress={e => handleStar(board.uuid)} className='bg-inherit visible group-hover/edit:transfrom transition-transform hover:scale-105 group-hover:bg-secondaryBG' size='sm' isIconOnly>
                          <Icon name='starYellow'/>
                        </Button>

                      ) : (
                        <Button onPress={e => handleStar(board.uuid)} className='bg-inherit group-hover/edit:transfrom transition-transform hover:scale-125 group-hover:bg-secondaryBG' size='sm' isIconOnly>
                          <Icon name='star'/>
                        </Button>
                      )}
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
