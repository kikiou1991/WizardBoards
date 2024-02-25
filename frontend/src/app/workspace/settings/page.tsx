"use client";
import Icon from "@/components/Icons";
import useOutsideClick from "@/components/customHooks/useOutsideClick";
import VisibilityModal from "@/components/modals/visibilityModal";
import WorkspaceHeader from "@/components/workspaceHeader";
import { Button } from "@nextui-org/react";
import React, { useRef, useState } from "react";

const Settings = () => {
  const [visibility, setVisibility] = useState("Private" as string);
  const [isVisible, setIsVisible] = useState(false);
  const [iconName, setIconName] = useState("privateSymbol" as string);

  const ref = useRef(null);
  const toggleModal = () => {
    setIsVisible(!isVisible);
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

  useOutsideClick(ref, toggleModal);

  return (
    <div className="mx-10">
      <WorkspaceHeader />
      <div className="flex flex-col z-0 mx-4 md:mx-28 flex-wrap overflow-x-hidden overflow-y-auto p-3 gap-2">
        <div className="text-foreground items-center">
          <div className="border-b-1 py-4 pl-3">Workspace visibility</div>
          <div className="flex flex-row py-3 items-center">
            <div className="flex justify-start items-center gap-2">
              <div className="flex flex-row gap-1 ml-5">
                <Icon name={iconName} />
                <p className="font-bold">{visibility}</p>
              </div>
              This Workspace is private. It is not visible to anyone outside of
              this workspace
            </div>
            <Button
              onClick={() => {
                handleVisibilityChange();
                toggleModal();
              }}
              id="changeButton"
              className="ml-auto mr-[250px]"
            >
              Change
            </Button>
            <div ref={ref} className={`${isVisible ? "" : "hidden"} p-0 m-0`}>
              <VisibilityModal toggleModal={toggleModal} />
            </div>
          </div>
        </div>
        <div className="upgrade mx-auto bg-slate-400 w-[1200px] h-[400px] ">
          <div className="flex flex-row gap-1 ml-2 items-center py-3">
            <p className="font-bold pl-2">Upgrade to premium today</p>
            <p>for more settings</p>
            <Button className="ml-auto mr-[248px]">Upgrade</Button>
          </div>
          <div className="p-2">Some other settings you could do</div>
        </div>
        <div className="flex cursor-pointer">
          <p className="text-red-500">Delete this workspace?</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
