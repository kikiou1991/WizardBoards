"use client";
import Icon from "@/components/Icons";
import useOutsideClick from "@/components/customHooks/useOutsideClick";
import VisibilityModal from "@/components/modals/visibilityModal";
import WorkspaceHeader from "@/components/workspaceHeader";
import { UserContext, UserContextType } from "@/contexts/Usercontext";
import {
  WorkspaceContext,
  WorkspaceContextType,
} from "@/contexts/WorkspaceContext";
import { workspaceBoards } from "@/lib/boards";
import { Button } from "@nextui-org/react";
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
      console.log("deleting this workspace");
      const workspaceToDelete = selectedWorkspace;
      if (workspaceToDelete) {
        await deleteWorkspace(token, selectedWorkspace);
        setSelectedWorkspace(workspaces[0].uuid);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useOutsideClick(ref, toggleModal);

  return (
    <div className="w-full overflow-y-auto">
      <WorkspaceHeader />
      <div className="flex flex-col z-0 mx-6 flex-wrap overflow-y-scroll p-3 gap-2 w-full">
        <div className="text-foreground items-center">
          <div className="flex cursor-pointer">
            <p onClick={() => handleDelete()} className="text-red-500">
              Delete this workspace?
            </p>
          </div>
          <div className="py-4 pl-3">Workspace visibility</div>
          <div className="flex flex-row py-3 items-center">
            <div className="flex justify-start items-center gap-2">
              <div className="flex flex-row gap-1 mx-auto">
                <Icon name={iconName} />
                <p className="font-bold">{visibility}</p>
              </div>
              This Workspace is private. It is not visible to anyone outside of
              this workspace
            </div>
            <Button
              onClick={() => {
                handleVisibilityChange();
                setIsVisible(true);
              }}
              id="changeButton"
              className="ml-auto mr-14"
            >
              Change
            </Button>
            <div ref={ref} className={`${isVisible ? "" : "hidden"} p-0 m-0`}>
              <VisibilityModal toggleModal={toggleModal} />
            </div>
          </div>
        </div>
        <div className="upgrade bg-slate-400 w-[1200px] h-[800px] ">
          <div className="flex flex-row gap-1 ml-2 items-center justify-center py-3">
            <p className="font-bold pl-2 ">Upgrade to premium today</p>
            <p>for more settings</p>
            <Button className="ml-auto mr-6">Upgrade</Button>
          </div>
          <div className="p-2 ml-2">Some other settings you could do</div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
