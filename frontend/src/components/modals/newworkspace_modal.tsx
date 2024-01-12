import Icon from '@/components/Icons';
import {UserContext, UserContextType} from '@/contexts/Usercontext';
import {Button, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger, Image, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem} from '@nextui-org/react';
import {useContext, useState} from 'react';

interface Workspace {
  uuid: string;
  name: string;
}

const MyWorkSpaceModal = () => {
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




  console.log(context?.workspaces);
  if (!context) return null;
  return (
    <>
      <Dropdown className='bg-background text-foreground w-' placement='bottom-start'>
        <DropdownTrigger>
          <Button className='bg-inherit hover:bg-secondaryBG' size='sm' isIconOnly>
            <Icon name='addIcon' classname={'bg-white'} />
          </Button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownSection>
            <DropdownItem className='data-[hover=true]:bg-secondaryBG' description='A board is made up of cards ordered on lists.' startContent={<Icon name='addBoard' />} onClick={openBoardModal}>
              <p>Create new board</p>
            </DropdownItem>
            <DropdownItem className='data-[hover=true]:bg-secondaryBG' description='A workspace is a group of boards and people.' startContent={<Icon name='addWorkspace' />} onClick={openWorkspaceModal}>
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
          base: "border-primary bg-primary dark:bg-background text-foreground",
          header: "border-b-[1px] border-foreground",
          footer: "border-t-[1px] border-foreground",
          closeButton: "hover:bg-white/5 active:bg-transparent",
        }}>
        <ModalContent>
          <ModalHeader className='flex flex-col gap-1 items-center align-middle'>
            <h1>Create Board</h1>
          </ModalHeader>
          <ModalBody>
            <Input isRequired type='email' label='Board Title' description='Name your new board' className='max-w-xs font-semibold text-slate-100' color='default' labelPlacement='outside' />
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
            <Button onSubmit={() => {}} className='items-center' color='primary' variant='solid'>
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
          body: 'py-6',
          backdrop: 'bg-background/50 backdrop-opacity-50',
          base: 'border-foreground bg-bacckground dark:bg-background text-foreground',
          header: 'border-b-[1px] border-[#041A42]',
          footer: 'border-t-[1px] border-[#041A42]',
          closeButton: 'hover:bg-white/5 active:bg-white/10',
        }}>
        <ModalContent>
          <ModalBody className='flex flex-row px-3 py-3'>
            <div className='flex flex-col gap-2 w-1/2 items-left'>
              <h1>Let`s build a Workspace</h1>
              <h2>Boost your productivity by making it easier for everyone to access boards in one location.</h2>
              <Input
                type='email'
                label='Workspace name'
                labelPlacement='outside'
                placeholder='Hufflepuff'
                description='This is the name of your company, team, or organization.'
                className='py-2 gap-1'
                classNames={{
                  base: 'max-w-full sm:max-w-[20rem] h-10',
                  mainWrapper: 'h-full ',
                  input: 'text-small',
                  inputWrapper: 'data-[hover=true]:bg-none h-full font-normal text-[#090607] bg-secondaryBG hover:bg-primary',
                }}
              />

              <div className='pt-7 items-center align-center max-w-full'>
                <Button size='md' color='primary' isDisabled={true}>
                  Button
                </Button>
              </div>
            </div>
            <div className='border-y-[#143f88] image w-1/2 '>
              <Image className='py-4 px-4 rounded-full' alt='badger' width={500} height={500} src='https://cdn.pixabay.com/photo/2015/10/06/22/04/harry-potter-975362_1280.jpg' />
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MyWorkSpaceModal;
