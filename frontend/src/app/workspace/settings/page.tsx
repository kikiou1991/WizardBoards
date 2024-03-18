"use client";
import PopUpBody from "@/components/CustomPopUp/Body";
import PopUpWrapper from "@/components/CustomPopUp/Wrapper";
import Icon from "@/components/Icons";
import useOutsideClick from "@/components/customHooks/useOutsideClick";
import WorkspaceHeader from "@/components/workspaceHeader";
import { UserContext, UserContextType } from "@/contexts/Usercontext";
import {
  WorkspaceContext,
  WorkspaceContextType,
} from "@/contexts/WorkspaceContext";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useContext, useRef, useState } from "react";

const Settings = () => {
  const { token } = useContext(UserContext) as UserContextType;
  const {
    workspaces,
    deleteWorkspace,
    selectedWorkspace,
    setSelectedWorkspace,
  } = useContext(WorkspaceContext) as WorkspaceContextType;
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();

  const openPopUp = () => {
    setIsOpen(true);
  };
  const ref = useRef(null);
  const toggleModal = () => {
    setIsVisible(false);
  };

  const handleDelete = async () => {
    try {
      const workspaceToDelete = selectedWorkspace;
      if (workspaceToDelete) {
        await deleteWorkspace(token, selectedWorkspace);
        if (workspaces[0]) {
          setSelectedWorkspace(workspaces[0].uuid);
        } else {
          router?.replace("/workspace/home");
        }
        setIsOpen(false);
        setIsSubmitted(true);
      }
    } catch (err) {
      console.error("Failed to delete workspace!", err);
    }
  };

  useOutsideClick(ref, toggleModal);

  return (
    <div className="w-full h-full overflow-hidden flex flex-col grow">
      <WorkspaceHeader />
      <div className="flex flex-col z-0  grow overflow-y-scroll h-full p-5 gap-2 w-full ">
        <div className="text-foreground items-center font-semibold hover:cursor-pointer">
          <p onClick={() => openPopUp()} className="text-red-500">
            Delete this workspace?
          </p>
        </div>
        <div className="relative text-foreground">
          <PopUpWrapper
            classNames={`absolute  left-0 ${
              isOpen ? "block " : "hidden"
            } top-0 z-20 w-[200px] bg-background  p-1 rounded-md shadow-md`}
          >
            <Button
              isIconOnly
              className="rounded-full z-30 flex items-center bg-inherit hover:bg-secondaryBG  ml-auto"
              onClick={() => setIsOpen(false)}
            >
              X
            </Button>
            <PopUpBody classNames="flex  flex-col items-center mx-auto">
              <h2 className="p-3 text-center font-semibold">
                {isSubmitted
                  ? "Workspace deleted successfully!"
                  : "Please confirm that you want to delete this workspace"}
              </h2>
              <Button
                color="danger"
                className="mb-5 hover:bg-red-400"
                onClick={() => handleDelete()}
              >
                Delete
              </Button>
            </PopUpBody>
          </PopUpWrapper>
        </div>
      </div>
    </div>
  );
};

export default Settings;
