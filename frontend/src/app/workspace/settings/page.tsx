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
  const [visibility, setVisibility] = useState("Private" as string);
  const [isVisible, setIsVisible] = useState(false);
  const [iconName, setIconName] = useState("privateSymbol" as string);
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

  const handleVisibilityChange = () => {
    if (visibility === "Public") {
      setVisibility("Private");
      setIconName("privateSymbol");
    } else {
      setVisibility("Public");
      setIconName("publicSymbol");
    }
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
        <div className="text-foreground items-center">
          <div className="py-4 pl-3">Workspace visibility</div>
          <div className="flex md:flex-row flex-col py-3 items-center">
            <div className="flex justify-start md:flex-row flex-col items-center gap-2">
              <div className="flex md:flex-row flex-col gap-1 mx-auto">
                <div className="flex flex-row gap-1">
                  <Icon name={iconName} />
                  <p className="font-bold">{visibility}</p>
                </div>
                This Workspace is private. It is not visible to anyone outside
                of this workspace
              </div>
            </div>
            <Button
              onClick={() => {
                handleVisibilityChange();
                setIsVisible(true);
              }}
              id="changeButton"
              className="ml-auto"
            >
              Change
            </Button>
            <div ref={ref} className={`${isVisible ? "" : "hidden"} p-0 m-0`}>
              {/* <VisibilityModal toggleModal={toggleModal} /> */}
            </div>
          </div>
        </div>
        <div className="text-foreground items-center hover:cursor-pointer">
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
