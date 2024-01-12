'use client';
import Icon from '@/components/Icons';
import {Button, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger, Navbar, NavbarContent} from '@nextui-org/react';
import React, {useEffect} from 'react';
import MyModal from '../modals/modal';
import MyWorkSpaceModal from '../modals/newworkspace_modal';
import navBarItems from '../navbar/navbardata';
import Socials from '../socials';
import Profile from './profile';

interface UserData {
  name: string;
  email: string;
  fullName: string;
}

const NavbarTop = () => {
  const [user, setUser] = React.useState<UserData | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        //retrieve the stored token
        const token = localStorage.getItem('token');

        if (!token) {
          console.log('Failed to fetch token!');
        }
        //use the token to get the user info
        const response = await fetch('https://gadorjani.co.uk/api/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          //fetch the user data
          console.log(response, "This is your response object")
          const userData = await response.json();

          setUser(userData);
        } else {
          //handle user fetch errors
          console.error('Failed to fetch user data', response.statusText);
        }
      } catch (error) {
        console.error('Failed to fetch user data', error);
      }
    };
    fetchUserData();
  }, []);

  return (
    <Navbar isBordered className='w-full border-b-[2px] border-border text-foreground bg-background' classNames={{base: 'w-screen', wrapper: 'w-screen max-w-none'}}>
      {/* Mobile Menu */}
      {/* <NavbarContent className="sm:hidden flex flex-grow-0 ">
        <NavbarMenuToggle aria-label="Open menu" />
        <NavbarMenu>
          <NavigationMobile />
        </NavbarMenu>
      </NavbarContent> */}

      {/* Left navigation section icon, header, and add button */}
      <NavbarContent className='items-center flex flex-grow-0 gap-1'>
        {/* File / Other Products / Navigation */}
        <Dropdown className='bg-background  text-foreground' placement='bottom-start'>
          <DropdownTrigger>
            <Button className='bg-inherit hover:bg-secondaryBG' size='sm' isIconOnly>
              <Icon name='menu' classname={'bg-white data-[hover=true]:bg-background'} />
            </Button>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownSection>
              <DropdownItem className='data-[hover=true]:bg-secondaryBG'>Contact us</DropdownItem>
              <DropdownItem className='data-[hover=true]:bg-secondaryBG'>Subscribe</DropdownItem>
              <DropdownItem className='data-[hover=true]:bg-secondaryBG'>Sign out</DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
        {/* Logo */}

        <Icon name='projectIcon' classname={'bg-white'} />
        {/*DropDown Navigation */}
        {navBarItems.map((navbar) => (
          <Dropdown key={navbar.id} className='bg-primary' placement='bottom-start'>
            <DropdownTrigger>
              <div className='flex gap-1 items-center'>
                <Button size='md' className='bg-inherit' endContent={<Icon name='downarrow' classname={'bg-white'} />}>
                  <p>{navbar.name}</p>
                </Button>
              </div>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownSection>
                {navbar.submenu.map((submenuItem) => (
                  <DropdownItem key={submenuItem.id}>{submenuItem.name}</DropdownItem>
                ))}
              </DropdownSection>
            </DropdownMenu>
          </Dropdown>
        ))}
        <MyWorkSpaceModal />
      </NavbarContent>

      {/* Empty space between left and right sections */}
      <div className='flex-grow'></div>

      {/* Right section with modal, calendar, notification, and profile */}
      <NavbarContent className=' flex bg-inherit'>
        {/* Model Section SearchBar */}
        <MyModal />

        {/* Calendar and Notifications */}
       
        <Dropdown className='bg-background' placement='bottom-end'>
          <DropdownTrigger>
            <Button className='bg-inherit hover:bg-secondaryBG' size='sm' isIconOnly>
              <Icon name='notiBell' classname={'stroke-current '} />
            </Button>
          </DropdownTrigger>
          <DropdownMenu className='text-foreground'>
            <DropdownSection>
              <DropdownItem className='data-[hover=true]:bg-secondaryBG'>Something</DropdownItem>
              <DropdownItem className='data-[hover=true]:bg-secondaryBG'>This is a notification</DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>

        {/* Social Media Links */}
        <Socials />

        {/*Profile Navigation / Logout / Profile settings */}

        <Profile name={user ? user.fullName : 'Anonymus...'} location='Bristol, UK' email={user ? user.email : 'Loading...'} />
      </NavbarContent>
    </Navbar>
  );
};

export default NavbarTop;
