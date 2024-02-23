"use client";
import WorkspaceHeader from "@/components/workspaceHeader";
import { Button } from "@nextui-org/react";
import React, { useState } from "react";

const Settings = () => {
  const [visibility, setVisibility] = useState("Public" as string);

  const handleVisibilityChange = () => {
    if (visibility === "Public") {
      setVisibility("Private");
    } else {
      setVisibility("Public");
    }
  };
  return (
    <div className="flex flex-col flex-wrap overflow-x-hidden overflow-y-auto p-3 gap-2 ">
      <WorkspaceHeader />
      <div className="text-foreground ">
        <div className="border-b-1 py-4">Workspace visibility</div>
        <div className="flex flex-row ">
          <div className="flex justify-start py-3">
            {visibility} This Workspace is private. It is not visible to anyone
            outside of this workspace
          </div>
          <Button className="flex justify-end">Change</Button>
        </div>
      </div>
      <div className="upgrade bg-blue-500 w-[900px] h-[400px]">
        <div className="flex flex-row gap-1">
          <p className="font-bold">Upgrade to premium today</p>
          <p>for more settings</p>
          <Button className="primary justify-end">Upgrade</Button>
        </div>
        <div>Some other settings you could do</div>
      </div>
      <div className="flex">
        <p className="text-red-500">Delete this workspace?</p>
      </div>
    </div>
  );
};

export default Settings;
