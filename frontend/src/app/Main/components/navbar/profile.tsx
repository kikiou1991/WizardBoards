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
    <Navbar className='bg-[#292f46]'>
    
          <NavbarContent as="div" className='items-center'>
              <Dropdown className='bg-slate-100' placement='bottom-end'>
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
                  <DropdownSection>
                    <DropdownItem>
                      <p className="font-semibold">Signed in as</p>
                      <p className="font-semibold">{email}</p></DropdownItem>
                    <DropdownItem>{name}</DropdownItem>
                    <DropdownItem>{location}</DropdownItem>
                    <DropdownItem>
                      <p className=''>Settings</p>
                    </DropdownItem>
                    <DropdownItem>
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