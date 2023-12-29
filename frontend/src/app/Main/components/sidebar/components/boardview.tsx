"use client"
import Icon from '@/components/Icons'
import React from 'react'

import {Dropdown, Button, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from '@nextui-org/react'

import MyModalEmail from '../sidebarmodal/newmember_modal'


const BoardView = () => {
  return (
    <div className='gap-1 flex flex-col '> 
        <div className='h-8 flex flex-row gap-2 hover:bg-[#602ee4] items-center  px-2'>
            <Icon name="board"/>
            <p>Boards</p>
        </div>
        <div className='h-8 flex flex-row gap-2 items-center hover:bg-[#602ee4] px-2'>
            <div className='flex flex-row gap-2 flex-grow items-center'>
                <Icon name="members"/>
                <p>Members</p>
            </div>
                <MyModalEmail/>
            
                
               

                   
           

        </div>
        <div className='h-8 flex flex-row  hover:bg-[#602ee4]  px-2 '>
            <div className='flex flex-row gap-2 flex-grow'>
                <Icon name="settings"/>
                <p className='font-semibold'>Settings</p>
            </div>
            <div className='items-center'>
                <Dropdown className="bg-slate-200" placement="bottom-start">
                    <DropdownTrigger>
                        <Button className="bg-inherit hover:bg-[#3d51a1]" size="sm" isIconOnly>
                        <Icon name="downarrow" />
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu className='bg-slate-200'>
                        <DropdownSection >
                        <DropdownItem>Something</DropdownItem>
                        <DropdownItem>This is a notification</DropdownItem>
                        </DropdownSection>
                    </DropdownMenu>
                </Dropdown>
            </div>

        </div>
    </div>
  )
}

export default BoardView