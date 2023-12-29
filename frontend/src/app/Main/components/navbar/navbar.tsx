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

const NavbarTop = () => {
  return (
    <Navbar
      isBordered
      className='w-full border-b-[2px] border-slate-300 text-[#a8b0d3] bg-[#292f46]'
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

      <Dropdown className="bg-slate-100" placement="bottom-start">
          <DropdownTrigger>
            <Button className="bg-[#292f46] hover:bg-[#3d51a1]" size="sm" isIconOnly>
              <Icon name="menu" />
            </Button>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownSection>
              <DropdownItem>Menu Item #1</DropdownItem>
              <DropdownItem>Menu Item #2</DropdownItem>
              <DropdownItem>Menu Item #3</DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>

        {/* Logo */}

        <Icon name="projectIcon" />
      
       
        {/*DropDown Navigation */}
        
        {navBarItems.map((navbar) => (
        <Dropdown key={navbar.id} className='bg-slate-100' placement='bottom-start'>
          <DropdownTrigger>
            <div className='flex gap-1 items-center'>
              <Button size='md' className='bg-inherit' endContent={<Icon name='downarrow' />}>
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
                

        <Dropdown className="bg-slate-100" placement="bottom-start">
          <DropdownTrigger>
            <Button className="bg-[#292f46] hover:bg-[#3d51a1]" size="sm" isIconOnly>
              <Icon name="addIcon" />
            </Button>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownSection>
              <DropdownItem>Something</DropdownItem>
              <DropdownItem>This is a notification</DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>

      {/* Empty space between left and right sections */}
      <div className="flex-grow"></div>

      {/* Right section with modal, calendar, notification, and profile */}
      <NavbarContent className="items-center flex flex-grow-0 flex-wrap-0">

        {/* Model Section SearchBar */}
        <MyModal />

      {/* Calendar and Notifications */}
        <Button className="bg-[#292f46] hover:bg-[#3d51a1]" size="sm" isIconOnly>
          <Icon name="calendar" />
        </Button>
        <Dropdown className="bg-slate-100" placement="bottom-end">
          <DropdownTrigger>
            <Button className="bg-[#292f46] hover:bg-[#3d51a1]" size="sm" isIconOnly>
              <Icon name="notiBell" />
            </Button>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownSection>
              <DropdownItem>Something</DropdownItem>
              <DropdownItem>This is a notification</DropdownItem>
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
