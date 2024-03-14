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
import { userList } from "@/lib/v2/users";

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
  const handleAddUser = async () => {
    //Add user to workspace
    try {
      const response = await userList.verifyUserEmail(token, userEmail);
      const userUuid = response.data._id;
      if (response) {
        addUserToWorkspace(token, selectedWorkspace, userUuid);
        toast.success("User added to workspace");
        closeModal();
      } else {
        toast.error("User not found");
      }
    } catch (error: unknown) {
      console.error("Error while trying to add user to workspace: ", error);
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
              onPressEnd={handleAddUser}
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
