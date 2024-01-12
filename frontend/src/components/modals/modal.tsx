'use client';
import Icon from '@/components/Icons';
import {Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalProps} from '@nextui-org/react';
import React, {useState} from 'react';

const MyModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  //Handle the Modal Opening
  const openModal = () => {
    setIsOpen(true);
  };
  //handle the Modal Closing
  const closeModal = () => {
    setIsOpen(false);
  };

  const [scrollBehavior, setScrollBehavior] = React.useState<ModalProps['scrollBehavior']>('inside');

  return (
    <>
      <Input
        classNames={{
          base: 'max-w-full md:max-w-[20rem] h-10',

          mainWrapper: 'h-full ',
          input: 'text-small',

          inputWrapper: 'data-[hover=true]:bg-secondaryBG h-full font-normal text-foreground bg-secondaryBG hover:bg-background',
        }}
        placeholder='Type to search...'
        size='md'
        startContent={<Icon name='searchIcon' classname='white' />}
        type='search'
        onClick={openModal}
      />

      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        backdrop='blur'
        radius='lg'
        classNames={{
          body: 'py-6',
          backdrop: 'bg-background/50 backdrop-opacity-50',
          base: 'border-[#041A42] bg-background dark:bg-background text-[#a8b0d3]',
          header: 'border-b-[1px] border-foreground',
          footer: 'border-t-[1px] border-foreground',
          closeButton: 'hover:bg-white/5 active:bg-white/10',
        }}
        scrollBehavior={scrollBehavior}>
        <ModalContent>
          <ModalHeader className='flex flex-col gap-1'>
            <Input
              classNames={{
                base: 'max-w-full sm:max-w-[24rem] h-10',
                mainWrapper: 'h-full w-full',
                input: 'text-small',
                inputWrapper: 'data-[hover=true]:bg-background h-full font-normal text-foreground bg-[#3d51a1]/50 hover:bg-secondaryBG',
              }}
              placeholder='Type to search...'
              size='md'
              startContent={<Icon name='searchIcon' classname='white' />}
              type='search'
              onClick={openModal}
            />
          </ModalHeader>
          <ModalBody>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor quam.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor quam.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor quam.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor quam.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor quam.</p>
            
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor quam.</p>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MyModal;
