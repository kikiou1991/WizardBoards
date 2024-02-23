"use client";
import useOutsideClick from "@/components/customHooks/useOutsideClick";
import VisibilityModal from "@/components/modals/visibilityModal";
import WorkspaceHeader from "@/components/workspaceHeader";
import { Button } from "@nextui-org/react";
import React, { useRef, useState } from "react";

const Settings = () => {
  const [visibility, setVisibility] = useState("Private" as string);
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const ref = useRef(null);
  const toggleModal = () => {
    setIsOpen(!isOpen);
    setIsVisible(!isVisible);
  };

  const handleVisibilityChange = () => {
    if (visibility === "Public") {
      setVisibility("Private");
    } else {
      setVisibility("Public");
    }
  };

  useOutsideClick(ref, toggleModal);

  return (
    <div className="flex flex-col z-0 flex-wrap overflow-x-hidden overflow-y-auto p-3 gap-2">
      <WorkspaceHeader />
      <div className="text-foreground items-center">
        <div className="border-b-1 py-4">Workspace visibility</div>
        <div className="flex flex-row py-3 items-center">
          <div className="flex justify-start items-center ">
            {visibility} This Workspace is private. It is not visible to anyone
            outside of this workspace
          </div>
          <Button
            onClick={() => {
              handleVisibilityChange();
              toggleModal();
            }}
            id="changeButton"
            className="ml-auto mr-10"
          >
            Change
          </Button>
          <div ref={ref} className={`${isVisible ? "" : "hidden"} p-0 m-0`}>
            <VisibilityModal />
          </div>
        </div>
      </div>
      <div className="upgrade bg-slate-400 w-[1200px] h-[400px]">
        <div className="flex flex-row gap-1 items-center py-3">
          <p className="font-bold">Upgrade to premium today</p>
          <p>for more settings</p>
          <Button className="ml-auto mr-10">Upgrade</Button>
        </div>
        <div>Some other settings you could do</div>
      </div>
      <div className="flex cursor-pointer">
        <p className="text-red-500">Delete this workspace?</p>
      </div>
    </div>
  );
};

export default Settings;
