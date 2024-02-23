"use client";
import WorkspaceHeader from "@/components/workspaceHeader";
import React, { useState } from "react";

const Settings = () => {
  const [visibility, setVisibility] = useState("Public" as string);
  return (
    <div className="flex flex-col flex-wrap overflow-x-hidden overflow-y-auto p-3 gap-2 ">
      <WorkspaceHeader />
      <div className="settings text-foreground ">
        <div className="border-b-1 py-4">Workspace visibility</div>
        <div>
          {visibility} This Workspace is private. It is not visible to anyone
          outside of this workspace
        </div>
      </div>
      <div className="upgrade bg-blue-500 w-10 h-8">
        <div className="flex flex-row gap-1">
          <p className="font-bold">Upgrade to premium today</p>
          <p>for more settings</p>
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
