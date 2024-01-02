"use client"
import React from 'react';
import {
  Navbar,
  NavbarContent,
  NavbarMenuToggle,
  NavbarMenu,
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from '@nextui-org/react';
import Icon from '@/components/Icons';

import Profile from './profile';
import NavigationMobile from '../mobileNavigation';
import MyModal from '../modals/modal';
import Socials from '../socials';


import navBarItems from '../navbar/navbardata'
import MyWorkSpaceModal from '../modals/newworkspace_modal';

const NavbarTop = () => {
  return (
    <Navbar
      isBordered
      className='w-full border-b-[2px] border-slate-300 text-[#E5EAF3] bg-[#041A42]'
      classNames={{ base: 'w-screen', wrapper: 'w-screen max-w-none' }}
    >
      {/* Mobile Menu */}
      {/* <NavbarContent className="sm:hidden flex flex-grow-0 ">
        <NavbarMenuToggle aria-label="Open menu" />
        <NavbarMenu>
          <NavigationMobile />
        </NavbarMenu>
      </NavbarContent> */}

      {/* Left navigation section icon, header, and add button */}
      <NavbarContent className="items-center flex flex-grow-0 gap-1">
        {/* File / Other Products / Navigation */}

      <Dropdown className="bg-[#041A42] text-[#E5EAF3]" placement="bottom-start">
          <DropdownTrigger>
            <Button className="bg-inherit hover:bg-[#3d51a1]" size="sm" isIconOnly>
              <Icon name="menu" classname={"bg-white"}/>
            </Button>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownSection>
              <DropdownItem className='data-[hover=true]:bg-[#143F88]'>Menu Item #1</DropdownItem>
              <DropdownItem className='data-[hover=true]:bg-[#143F88]'>Menu Item #2</DropdownItem>
              <DropdownItem className='data-[hover=true]:bg-[#143F88]'>Menu Item #3</DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>

        {/* Logo */}

        <Icon name="projectIcon" classname={"bg-white"}/>
      
       
        {/*DropDown Navigation */}
        
        {navBarItems.map((navbar) => (
        <Dropdown key={navbar.id} className='bg-[#041A42]' placement='bottom-start'>
          <DropdownTrigger>
            <div className='flex gap-1 items-center'>
              <Button size='md' className='bg-inherit' endContent={<Icon name='downarrow' classname={"bg-white"}/>}>
                <p>{navbar.name}</p>
              </Button>
            </div>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownSection>
                {navbar.submenu.map((submenuItem) => (
                  <DropdownItem key={submenuItem.id}>
                    {submenuItem.name}
                  </DropdownItem>
        ))}
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
      ))}
                

       <MyWorkSpaceModal/>
             
                  
               
      </NavbarContent>

      {/* Empty space between left and right sections */}
      <div className="flex-grow"></div>

      {/* Right section with modal, calendar, notification, and profile */}
      <NavbarContent className="items-center flex flex-grow-0 flex-wrap-0 bg-inherit">

        {/* Model Section SearchBar */}
        <MyModal />

      {/* Calendar and Notifications */}
        <Button className="bg-inherit hover:bg-[#3d51a1]" size="sm" isIconOnly>
          <Icon name="calendar" classname={"bg-white"}/>
        </Button>
        <Dropdown className="bg-[#041A42]" placement="bottom-end">
          <DropdownTrigger>
            <Button className="bg-inherit hover:bg-[#3d51a1]" size="sm" isIconOnly>
              <Icon name="notiBell" classname={"bg-white"} />
            </Button>
          </DropdownTrigger>
          <DropdownMenu className='text-[#E5EAF3]'>
            <DropdownSection>
              <DropdownItem className='data-[hover=true]:bg-[#143F88]'>Something</DropdownItem>
              <DropdownItem className='data-[hover=true]:bg-[#143F88]'>This is a notification</DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>

      {/* Social Media Links */}
        <Socials/>

      {/*Profile Navigation / Logout / Profile settings */}
      
        <Profile name="Gabor Adorjani" location="Bristol, UK" email='gadorjani@windowslive.com' />
      </NavbarContent>
    </Navbar>
  );
};
        


export default NavbarTop;
