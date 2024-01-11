'use client';
import { UserContext, UserContextType } from '@/contexts/Usercontext';
import {Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger, Navbar, NavbarContent} from '@nextui-org/react';
import {useContext} from 'react';

interface Props {
  name: string;
  location: string;
  email: string;
}

const Profile = ({name, location, email}: Props) => {
  const {handleLogout} = useContext(UserContext) as UserContextType
  return (
    <Navbar className='bg-background'>
      <NavbarContent as='div' className='items-center'>
        <Dropdown className='text-foreground' placement='bottom-end'>
          <DropdownTrigger>
            <Avatar isBordered as='button' className='transition-transform' color='secondary' name={name} size='sm' src='https://i.pravatar.cc/150?u=a042581f4e29026704d' />
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownSection className='text-current'>
              <DropdownItem className='hover:bg-secondaryBG'>
                <p className='font-semibold'>Signed in as</p>
                <p className='font-semibold'>{email}</p>
              </DropdownItem>
              <DropdownItem className='hover:bg-secondaryBG'>
                <p className='font-semibold'>{name}</p>
              </DropdownItem>
              <DropdownItem className='hover:bg-secondaryBG'>
                <p className='font-semibold'>{location}</p>
              </DropdownItem>
              <DropdownItem className='hover:bg-secondaryBG'>
                <p className='font-semibold'>Settings</p>
              </DropdownItem>
              <DropdownItem className='hover:bg-secondaryBG' onClick={handleLogout}>
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
