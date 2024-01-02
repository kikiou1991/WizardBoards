import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, DropdownSection, Select, SelectItem } from "@nextui-org/react";
import Icon from '@/components/Icons';
import { Image } from '@nextui-org/react';

const MyWorkSpaceModal = () => {
  const [isBoardModalOpen, setBoardModalOpen] = useState(false);
  const [isWorkspaceModalOpen, setWorkspaceModalOpen] = useState(false);

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
      <Dropdown className="bg-[#041A42] text-[#E5EAF3] w-" placement="bottom-start">
        <DropdownTrigger>
          <Button className="bg-inherit hover:bg-[#3d51a1]" size="sm" isIconOnly>
            <Icon name="addIcon" classname={"bg-white"} />
          </Button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownSection>
            <DropdownItem
              className='data-[hover=true]:bg-[#143F88]'
              description="A board is made up of cards ordered on lists."
              startContent={<Icon name="addBoard" />}
              onClick={openBoardModal}
            >
              <p>Create new board</p>
            </DropdownItem>
            <DropdownItem
              className='data-[hover=true]:bg-[#143F88]'
              description="A workspace is a group of boards and people."
              startContent={<Icon name="addWorkspace" />}
              onClick={openWorkspaceModal}
            >
              <p>Create Workspace</p>
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>

      {/* Render Board Modal */}
      <Modal
        isOpen={isBoardModalOpen}
        onClose={closeModals}
        backdrop='blur'
        radius='lg'
        classNames={{
            body: "py-6",
            backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
            base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
            header: "border-b-[1px] border-[#292f46]",
            footer: "border-t-[1px] border-[#292f46]",
            closeButton: "hover:bg-white/5 active:bg-transparent"          
        }}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1 items-center align-middle">
            <h1>Create Board</h1>
          </ModalHeader>
          <ModalBody>
            <Input
              isRequired
              type="email"
              label="Board Title"
              description="Name your new board"
              className="max-w-xs font-semibold text-slate-100"
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
            {/* Additional content specific to the board modal */}
          </ModalBody>
          <ModalFooter>
            <Button onSubmit={() => {}} className="items-center" color='primary' variant='solid'>
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Render Workspace Modal */}
      <Modal
        size='5xl'
        isOpen={isWorkspaceModalOpen}
        onClose={closeModals}
        backdrop='blur'
        radius='lg'
        classNames={{
            body: "py-6",
            backdrop: "bg-[#041A42]/50 backdrop-opacity-40",
            base: "border-[#041A42] bg-[#041A42] dark:bg-[#19172c] text-[#a8b0d3]",
            header: "border-b-[1px] border-[#041A42]",
            footer: "border-t-[1px] border-[#041A42]",
            closeButton: "hover:bg-white/5 active:bg-white/10",


        }}
      >
        <ModalContent>
          <ModalBody className='flex flex-row px-3 py-3'>
            <div className='flex flex-col gap-2 w-1/2 items-left'>
              <h1>Let`s build a Workspace</h1>
              <h2>Boost your productivity by making it easier for everyone to access boards in one location.</h2>
              <Input
                type="email"
                label="Workspace name"
                labelPlacement='outside'
                placeholder="Hufflepuff"
                description="This is the name of your company, team, or organization."
                className='py-2 gap-1'
                classNames={{
                  base: "max-w-full sm:max-w-[20rem] h-10",
                  mainWrapper: "h-full ",
                  input: "text-small",
                  inputWrapper: "data-[hover=true]:bg-[#143f88] h-full font-normal text-[#090607] bg-[#143f88] hover:bg-[#86a8e2]",
                }}
              />
              <div className='pt-7 items-center align-center max-w-full'>
                <Button
                  size="md"
                  color="primary"
                  isDisabled={true}
                >
                  Button
                </Button>
              </div>
            </div>
            <div className='border-y-[#143f88] image w-1/2 '>
              <Image className='py-4 px-4 rounded-full' alt="badger" width={500} height={500} src="https://cdn.pixabay.com/photo/2015/10/06/22/04/harry-potter-975362_1280.jpg" />
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default MyWorkSpaceModal;
