"use client"
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger, Navbar, NavbarContent } from '@nextui-org/react'
import React from 'react'

interface Props {
    name: string,
    location: string,
    email: string
}

const Profile = ({name, location, email}: Props) => {
  return (
    <Navbar className='bg-inherit'>
    
          <NavbarContent as="div" className='items-center'>
              <Dropdown className='bg-[#041A42]' placement='bottom-end'>
                <DropdownTrigger>
                  <Avatar
                          isBordered
                          as="button"
                          className="transition-transform"
                          color="secondary"
                          name={name}
                          size="sm"
                          src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                    />

                </DropdownTrigger>
                <DropdownMenu >
                  <DropdownSection className='text-[#E5EAF3]'>
                    <DropdownItem className='data-[hover=true]:bg-[#143F88]'>
                      <p className="font-semibold">Signed in as</p>
                      <p className="font-semibold">{email}</p></DropdownItem>
                    <DropdownItem className='data-[hover=true]:bg-[#143F88]'>{name}</DropdownItem>
                    <DropdownItem className='data-[hover=true]:bg-[#143F88]'>{location}</DropdownItem>
                    <DropdownItem className='data-[hover=true]:bg-[#143F88]'>
                      <p className=''>Settings</p>
                    </DropdownItem>
                    <DropdownItem className='data-[hover=true]:bg-[#143F88]'>
                      <p className=''>Logout</p>
                    </DropdownItem>


                  </DropdownSection>
                  
                </DropdownMenu>
              </Dropdown>
          </NavbarContent>
    </Navbar>
  )
}

export default Profile