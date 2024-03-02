import { Button } from "@nextui-org/react";
import React, { useContext } from "react";
import MyModalEmail from "../sidebar/sidebarmodal/newmember_modal";
import {
  WorkspaceContext,
  WorkspaceContextType,
} from "@/contexts/WorkspaceContext";

interface Workspace {
  uuid: string;
  name: string;
}

const WorkspaceHeader = () => {
  const { workspaces, selectedWorkspace } = useContext(
    WorkspaceContext
  ) as WorkspaceContextType;
  const selectedWorkspaceName = workspaces.find(
    (workspace: Workspace) => workspace.uuid === selectedWorkspace
  )?.name;

  const initial = workspaces.find(
    (workspace: Workspace) => workspace.uuid === selectedWorkspace
  )?.name[0];

  return (
    <div className="flex flex-row gap-2 items-center justify-center border-b-1 p-8">
      <div className="flex flex-row gap-2 justify-center items-center mx-5">
        <div className="flex rounded-md w-[45px] h-[45px] font-bold text-3xl text-white p-2 items-center justify-center  bg-gradient-to-r from-sky-500 to-indigo-500">
          {initial}
        </div>
        <h2 className="font-bold text-foreground text-2xl">
          {selectedWorkspaceName}
        </h2>
      </div>
      <div className="ml-auto mr-10">
        <Button color="primary">
          <MyModalEmail name="members" />
          {"Invite Worksapce Member"}
        </Button>
      </div>
    </div>
  );
};

export default WorkspaceHeader;
