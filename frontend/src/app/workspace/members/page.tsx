"use client";
import WorkspaceHeader from "@/components/workspaceHeader";
import React from "react";

const MembersArea = () => {
  return (
    <div className="mx-10">
      <WorkspaceHeader />
      <div className="flex flex-col z-0 mx-4 md:mx-28 flex-wrap overflow-x-hidden overflow-y-auto p-3 gap-2">
        <div className="flex text-foreground font-bold text-3xl justify-center items-center w-full h-[500px]">
          This is the members area
        </div>
      </div>
    </div>
  );
};

export default MembersArea;
