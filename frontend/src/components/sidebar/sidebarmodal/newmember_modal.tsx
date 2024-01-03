"use client"
import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalProps,ModalBody, ModalFooter, Button, Input } from "@nextui-org/react";
import Icon from '@/components/Icons'

const MyModalEmail = () => {
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
          <ModalHeader className="flex flex-col gap-1">
              <h1>Invite to workspace</h1>

          </ModalHeader>
          <ModalBody>
          <Input
                type="email"
                label="Email"
                placeholder="someone@gmail.com"
                description="Please enter the email address of the person you wish to invite."
                className="max-w-xs text-[#f25746] "
                color='default'
              />
           
          </ModalBody>
          <ModalFooter>
           
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default MyModalEmail;
