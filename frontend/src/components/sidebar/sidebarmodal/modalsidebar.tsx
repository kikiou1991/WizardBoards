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
      {/* <Icon name="addIcon" onClick={openModal}/> */}

      <Icon name='addIcon' onClick={openModal} />

      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        backdrop='blur'
        radius='lg'
        classNames={{
          body: 'py-6',
          backdrop: 'bg-[#292f46]/50 backdrop-opacity-40',
          base: 'border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]',
          header: 'border-b-[1px] border-[#292f46]',
          footer: 'border-t-[1px] border-[#292f46]',
          closeButton: 'hover:bg-white/5 active:bg-white/10',
        }}
        scrollBehavior={scrollBehavior}>
        <ModalContent>
          <ModalHeader className='flex flex-col gap-1'>
            <Input
              classNames={{
                base: 'max-w-full sm:max-w-[28rem] h-10',
                mainWrapper: 'h-full w-full',
                input: 'text-small',
                inputWrapper: ' h-full w-full font-normal ',
              }}
              placeholder='Type to search...'
              size='md'
              startContent={<Icon name='searchIcon' />}
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
            {/* ... (other content) ... */}
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor quam.</p>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MyModal;
