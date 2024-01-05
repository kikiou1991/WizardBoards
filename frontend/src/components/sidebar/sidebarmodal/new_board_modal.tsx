"use client"
import React, { useContext, useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalProps,ModalBody, ModalFooter, Button, Input, DropdownTrigger, DropdownSection, DropdownMenu, DropdownItem, Dropdown, Select, SelectItem } from "@nextui-org/react";
import Icon from '@/components/Icons'
import { UserContext, UserContextType } from '@/contexts/Usercontext';

interface Workspace {
  uuid: string;
  name: string;
}

const MyModalNewBoard = () => {
  const [isBoardModalOpen, setBoardModalOpen] = useState(false);
  const [isWorkspaceModalOpen, setWorkspaceModalOpen] = useState(false);
  const context = useContext(UserContext);
  const {workspaces} = useContext(UserContext) as UserContextType
  const openBoardModal = () => {
    setBoardModalOpen(true);
    setWorkspaceModalOpen(false);
  };

  const openWorkspaceModal = () => {
    setBoardModalOpen(false);
    setWorkspaceModalOpen(true);
  };

  const closeModals = () => {
    setBoardModalOpen(false);
    setWorkspaceModalOpen(false);
  };

 
  if (!context) return null;
  
  return (
    <>
      <Icon name="addIcon" onClick={openBoardModal}/>   
      <Modal 
            isOpen={isBoardModalOpen}
            onClose={closeModals}
            backdrop='blur'
            radius='lg'
            classNames={{
                body: "py-6 border-foreground",
                backdrop: "bg-secondayBG/50 backdrop-opacity-40",
                base: "border-foreground bg-primary dark:bg-background text-foreground",
                header: "border-b-[1px] border-border",
                footer: "border-t-[1px] border-border",
                closeButton: "hover:bg-white/5 active:bg-transparent",
              }}             
        >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1 items-center align-middle">
              <h1 className=''>Create Board</h1>
          </ModalHeader>
          <ModalBody className=''>
              <Input
                isRequired
                type="email"
                label="Board Title"
                description="Name your new board"
                className="max-w-xs font-semibold text-foreground"
                color='default'                
                labelPlacement='outside'
              />              
                    <div className='flex flex-row items-center'>
                      <Select
                        isRequired
                        size='sm'
                        label='Workspace'
                        placeholder='Select a workspace'
                        className='max-w-xs text-foreground '
                      >              
                          {workspaces.map((workspace) => (
                            <SelectItem className="text-foreground" key={workspace.uuid} value={workspace.name}>
                              {workspace.name}
                            </SelectItem>
                          ))}
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
    
                                               
