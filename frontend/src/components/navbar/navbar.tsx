'use client';
import Icon from '@/components/Icons';
import {Button, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger, Navbar, NavbarContent, Switch} from '@nextui-org/react';
import React, {useContext, useEffect, useState} from 'react';
import MyModal from '../modals/modal';
import MyWorkSpaceModal from '../modals/newworkspace_modal';
import navBarItems from '../navbar/navbardata';
import Socials from '../socials';
import Profile from './profile';
import { UserContext, UserContextType } from '@/contexts/Usercontext';

interface UserData {
  name: string;
  email: string;
  fullName: string;
}

const NavbarTop = () => {
  const [user, setUser] = React.useState<UserData | null>(null);
  
  const { workspaces, fetchWorkspaces, setWorkspace, token, selectedWorkspace, setSelectedWorkspace } = useContext(
    UserContext
  ) as UserContextType;
  
  useEffect(() => {
    fetchWorkspaces(token); // Fetch workspaces when the component mounts
  }, [token]);

  useEffect(() => {
    // Set the default selectedWorkspace to the UUID of the first workspace if available
    if (workspaces.length > 0) {
      setSelectedWorkspace(workspaces[0].uuid);
    }
  }, [workspaces]); // Run this effect whenever workspaces change

  const handleWorkspaceChange = (workspaceId: string) => {
    setSelectedWorkspace(workspaceId);
    const selectedWorkspaceObject = workspaces.find((workspace) => workspace.uuid === workspaceId);
    setWorkspace(selectedWorkspaceObject || null); // Update the current workspace in the context
  };


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
    <Navbar isBordered className='border-b-[2px] border-border text-foreground bg-background flex flex-row' classNames={{base: 'w-screen', wrapper: 'w-screen max-w-none'}}>
      {/* Mobile Menu */}
      {/* <NavbarContent className="sm:hidden flex flex-grow-0 ">
        <NavbarMenuToggle aria-label="Open menu" />
        <NavbarMenu>
          <NavigationMobile />
        </NavbarMenu>
      </NavbarContent> */}

      {/* Left navigation section icon, header, and add button */}
      <NavbarContent className='items-center flex flex-grow-0 gap-3'>
        {/* File / Other Products / Navigation */}
        <Dropdown className='bg-background text-foreground' placement='bottom-start'>
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
        {/*DropDown For WorkSpaces */}
        {workspaces.length > 0 && (
          <Dropdown key="workspacesDropdown" className='bg-background text-foreground' placement='bottom-start'>
            <DropdownTrigger>
              <div className='flex gap-1 items-center'>
                  <p>Workspaces</p>
                  <Icon name='downarrow' classname={'bg-white'} />
              </div>
            </DropdownTrigger>
            <DropdownMenu>
              {workspaces.map((workspace: any) => (
                <DropdownItem
                  key={workspace.uuid}
                  onClick={() => {
                    handleWorkspaceChange(workspace.uuid);
                  }}
                >
                  {workspace.name}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        )}
        <MyWorkSpaceModal />
      </NavbarContent>

      {/* Empty space between left and right sections */}
      <div className='flex-grow'></div>

      {/* Right section with modal, calendar, notification, and profile */}
      <NavbarContent className=' flex flex-grow-0 bg-inherit'>
        {/* Model Section SearchBar */}
        <MyModal />

        {/* Calendar and Notifications */}
       
        <Dropdown 
            classNames={{
              base: "before:bg-background",
              content: "py-1 px-1 border border-default-200 bg-background dark:from-default-50 dark:to-black"
            }}
            placement='bottom-end'
            closeOnSelect={false}
            >
          <DropdownTrigger>
            <Button className='bg-inherit hover:bg-secondaryBG' size='sm' isIconOnly>
              <Icon name='notiBell' classname={'stroke-current '} />
            </Button>
          </DropdownTrigger>
          <DropdownMenu className='text-foreground'>
            <DropdownSection className='py-2 px-2 ' showDivider>
              <DropdownItem>{"Notifications"}
              <div className='flex flex-row gap-5'>
                <p>Only show undread</p>
                <Switch defaultSelected color="success" size='sm'></Switch>
                <Button className='bg-inherit' size='sm' isIconOnly endContent={<Icon name="threeDots"/>}></Button>
                
              </div>
              </DropdownItem>
              
             
            </DropdownSection>
            <DropdownSection showDivider>
              <DropdownItem className='data-[hover=true]:bg-secondaryBG'>Something</DropdownItem>
              <DropdownItem className='data-[hover=true]:bg-secondaryBG'>This is a notification</DropdownItem>
            </DropdownSection>
            <DropdownSection >
              <DropdownItem></DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>

        {/* Social Media Links */}
        <Socials />

        {/*Profile Navigation / Logout / Profile settings */}

        <Profile name={user ? user.fullName : 'Anonymus...'}   email={user ? user.email : 'Loading...'} />
      </NavbarContent>
    </Navbar>
  );
};

export default NavbarTop;
