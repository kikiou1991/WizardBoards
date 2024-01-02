"use client"
import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalProps,ModalBody, ModalFooter, Button, Input, DropdownTrigger, DropdownSection, DropdownMenu, DropdownItem, Dropdown, Select, SelectItem } from "@nextui-org/react";
import Icon from '@/components/Icons'

const MyModalNewBoard = () => {
  const [isOpen, setIsOpen] = useState(false);
//Handle the Modal Opening
  const openModal = () => {
    setIsOpen(true);
  };
//handle the Modal Closing
  const closeModal = () => {
    setIsOpen(false);
  };

  const [scrollBehavior, setScrollBehavior] = React.useState<ModalProps["scrollBehavior"]>("inside");


  const items = [
    {
      "name": "Number One",
      "id": 2,
    },
    {
      "name": "Number Two",
      "id": 3,
    }
  ]

  return (
    <>
    
    {/* <Icon name="addIcon" onClick={openModal}/> */}
      
      <Icon name="addIcon" onClick={openModal}/>

                            
                            
      <Modal 
            isOpen={isOpen}
            onClose={closeModal}
            backdrop='blur'
            radius='lg'
            classNames={{
                body: "py-6",
                backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
                base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
                header: "border-b-[1px] border-[#292f46]",
                footer: "border-t-[1px] border-[#292f46]",
                closeButton: "hover:bg-white/5 active:bg-transparent",
              }}
              scrollBehavior={scrollBehavior}
        >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1 items-center align-middle">
              <h1 className=''>Create Board</h1>

          </ModalHeader>
          <ModalBody>
              <Input
                isRequired
                type="email"
                label="Board Title"
                description="Name your new board"
                className="max-w-xs font-semibold text-[#e5eaf3]"
                color='default'
                
                labelPlacement='outside'
              />
              
                    <div className='flex flex-row items-center'>
                    <Select
                      isRequired
                      size='sm'
                      items={items}
                      label="Workspace"
                      placeholder="Select a workspace"
                      className="max-w-xs text-[#e5eaf3] "
                      classNames={{
                       
                      
                    
                      }}
                    >
                      {(item) => <SelectItem className='text-[#e5eaf3]' key={item.id}>{item.name}</SelectItem>}
                    </Select>

                           
                     

                    </div>
               
           
          </ModalBody>
          <ModalFooter>
            {/* Sumbit button so add new */}
              <Button onSubmit={() => {}} className="items-center" color='primary' variant='solid'>Create</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default MyModalNewBoard;
