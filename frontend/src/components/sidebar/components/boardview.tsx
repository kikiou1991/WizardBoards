'use client';
import Icon from '@/components/Icons';

import {Button, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger} from '@nextui-org/react';

import MyModalEmail from '../sidebarmodal/newmember_modal';
import Link from 'next/link';

const BoardView = () => {
  return (
    <div className='gap-1 flex flex-col '>
      <div className='h-8 flex flex-row gap-2 hover:bg-secondaryBG items-center  px-2'>
        <div className='flex flex-row gap-2 flex-grow '>
          <Icon name='board' />
          <Link href="/workspace/home">Boards</Link>

        </div>
      </div>
      <div className='h-8 flex flex-row gap-2 items-center hover:bg-secondaryBG pl-2'>
        <div className='flex flex-row gap-2 flex-grow '>

          <Icon name='members' />
          <Link href="/workspace/members">Members</Link>
        </div>
        <MyModalEmail />
      </div>
      <div className='h-8 flex flex-row  hover:bg-secondaryBG  pl-2 '>
        <div className='flex flex-row gap-2 flex-grow'>
          <Icon name='settings' classname='p-1'/>
          <Link href="/workspace/settings" className='font-semibold'>Settings</Link>
        </div>
        <div className='items-center'>
          <Dropdown className='bg-background text-[#E5EAF3]' placement='bottom-start'>
            <DropdownTrigger>
              <Button className='bg-inherit hover:bg-secondaryBG' size='sm' isIconOnly>
                <Icon name='downarrow' />
              </Button>
            </DropdownTrigger>
            <DropdownMenu className='bg-background'>
              <DropdownSection>
                <DropdownItem className='data-[hover=true]:bg-secondaryBG'>Something</DropdownItem>
                <DropdownItem className='data-[hover=true]:bg-secondaryBG'>This is a notification</DropdownItem>
              </DropdownSection>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default BoardView;
