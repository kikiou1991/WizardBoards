'use client';
import { UserContext, UserContextType } from '@/contexts/Usercontext';
import {Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger, Navbar, NavbarContent} from '@nextui-org/react';
import {useContext} from 'react';
import Socials from './socials';

interface Props {
  name: string;
  
  email: string;
}

const Profile = ({name,  email}: Props) => {
  const {handleLogout} = useContext(UserContext) as UserContextType
  return (
    <Navbar className='bg-background px-1' classNames={{ wrapper: "px-0" }}>
      <NavbarContent as='div' className='items-center'>
        <Dropdown className='text-foreground' placement='bottom-end'>
          <DropdownTrigger>
            <Avatar isBordered as='button'  className='transition-transform p' color='primary' name={name} size='sm' src='https://i.pravatar.cc/150?u=a042581f4e29026704d' />
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownSection>
              <DropdownItem>
                <p className='py-0 px-0'>Account</p>
                <div className='sm:hidden'>
                  <Socials />
                </div>
                </DropdownItem>
            </DropdownSection>
            <DropdownSection className='text-current' showDivider>
              <DropdownItem className='hover:bg-secondaryBG'>
                <p className='font-semibold'>Signed in as</p>
                <p className='font-semibold p-0'>{email}</p>
              </DropdownItem>
              <DropdownItem></DropdownItem>
              <DropdownItem className='hover:bg-secondaryBG'>
                <p className='font-semibold p-0'>{name}</p>
              </DropdownItem>
              
            </DropdownSection>
            <DropdownSection showDivider>
            <DropdownItem className='hover:bg-secondaryBG'>
                <p className='font-semibold'>Help, feedback</p>
              </DropdownItem>
              <DropdownItem className='hover:bg-secondaryBG'>
                <p className='font-semibold'>Settings</p>
              </DropdownItem>
            </DropdownSection>
            <DropdownSection>
              <DropdownItem className='hover:bg-secondaryBG flex flex-row' onClick={handleLogout}>

                <p className='font-semibold'>Logout</p>
              </DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
};

export default Profile;
