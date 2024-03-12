"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalProps,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import Icon from "@/components/Icons";
import {
  WorkspaceContext,
  WorkspaceContextType,
} from "@/contexts/WorkspaceContext";
import { UserContext, UserContextType } from "@/contexts/Usercontext";
import { User } from "@/types";
import toast from "react-hot-toast";

interface Props {
  name: string;
  onClick?: () => void;
}

const MyModalEmail = ({ name, onClick }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { selectedWorkspace, addUserToWorkspace } = useContext(
    WorkspaceContext
  ) as WorkspaceContextType;
  const { allUsers, token } = useContext(UserContext) as UserContextType;
  const [userEmail, setUserEmail] = useState("");
  const [singleUser, setSingleUser] = useState<User | null>(null);
  const findUser = () => {
    try {
      const user = allUsers.find((user: User) => user.email === userEmail);
      setSingleUser(user);
    } catch (error) {}
  };
  useEffect(() => {
    findUser();
  }, [userEmail]);

  const handleChange = (value: string) => {
    setUserEmail(value);
  };
  //Handle the Modal Opening
  const openModal = () => {
    setIsOpen(true);
  };
  //handle the Modal Closing
  const closeModal = () => {
    setIsOpen(false);
  };
  const handleAddUser = () => {
    //Add user to workspace
    if (singleUser) {
      addUserToWorkspace(token, selectedWorkspace, singleUser.uuid);
    } else {
      toast.error("No user exists with that email");
    }
  };

  const [scrollBehavior, setScrollBehavior] =
    React.useState<ModalProps["scrollBehavior"]>("inside");

  return (
    <>
      {/* <Icon name="addIcon" onClick={openModal}/> */}

      <Icon name={name} onClick={openModal} />

      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        backdrop="blur"
        radius="lg"
        classNames={{
          body: "py-6",
          backdrop: "bg-background/50 backdrop-opacity-40",
          base: " bg-primary dark:bg-background text-foreground",
          header: "border-b-[1px] border-foreground",
          footer: "border-t-[1px] border-foreground",
          closeButton: "hover:bg-white/5 active:bg-transparent",
        }}
        scrollBehavior={scrollBehavior}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            <h1>Invite to workspace</h1>
          </ModalHeader>
          <ModalBody className="flex items-center">
            <Input
              type="email"
              label="Email"
              placeholder="someone@gmail.com"
              description="Please enter the email address of the person you wish to invite."
              className="max-w-xs text-[#f25746] "
              color="default"
              onChange={(e) => handleChange(e.target.value)}
            />
            <Button
              color="primary"
              onPressEnd={() => handleAddUser}
              className=""
              type="submit"
            >
              Submit
            </Button>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MyModalEmail;
