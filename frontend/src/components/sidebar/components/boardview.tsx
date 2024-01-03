'use client';
import Icon from '@/components/Icons';

import {Button, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger} from '@nextui-org/react';

import MyModalEmail from '../sidebarmodal/newmember_modal';

const BoardView = () => {
  return (
    <div className='gap-1 flex flex-col '>
      <div className='h-8 flex flex-row gap-2 hover:bg-primary items-center  px-2'>
        <Icon name='board' />
        <p>Boards</p>
      </div>
      <div className='h-8 flex flex-row gap-2 items-center hover:bg-primary px-2'>
        <div className='flex flex-row gap-2 flex-grow items-center'>
          <Icon name='members' />
          <p>Members</p>
        </div>
        <MyModalEmail />
      </div>
      <div className='h-8 flex flex-row  hover:bg-primary  px-2 '>
        <div className='flex flex-row gap-2 flex-grow'>
          <Icon name='settings' />
          <p className='font-semibold'>Settings</p>
        </div>
        <div className='items-center'>
          <Dropdown className='bg-[#041A42] text-[#E5EAF3]' placement='bottom-start'>
            <DropdownTrigger>
              <Button className='bg-inherit hover:bg-primary' size='sm' isIconOnly>
                <Icon name='downarrow' />
              </Button>
            </DropdownTrigger>
            <DropdownMenu className='bg-[#041A42]'>
              <DropdownSection>
                <DropdownItem className='data-[hover=true]:bg-primary'>Something</DropdownItem>
                <DropdownItem className='data-[hover=true]:bg-primary'>This is a notification</DropdownItem>
              </DropdownSection>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default BoardView;
