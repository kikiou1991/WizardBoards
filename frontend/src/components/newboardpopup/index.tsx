import { BoardContext, BoardContextType } from "@/contexts/BoardContext";
import { UserContext } from "@/contexts/Usercontext";
import {
  WorkspaceContext,
  WorkspaceContextType,
} from "@/contexts/WorkspaceContext";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import Image from "next/image";
import React, { useContext, useState } from "react";

interface Position {
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
  isVisible?: boolean;
  setVisi?: () => void;
}

const NewBoardPopUp = ({
  top,
  left,
  right,
  bottom,
  isVisible,
  setVisi,
}: Position) => {
  const { workspaces, localSelectedWorkspace, setLocalSelectedWorkspace } =
    useContext(WorkspaceContext) as WorkspaceContextType;
  const { createBoard } = useContext(BoardContext) as BoardContextType;
  const [boardTitle, setBoardTitle] = useState("");
  const [selectedWorkspace, setSelectedWorkspace] = useState<string | null>("");
  const [workSpaceTitle, setWorkSpaceTitle] = useState("");
  const context = useContext(UserContext);
  const handleCreateBoard = async () => {
    console.log("clicked");
    if (!boardTitle || !localSelectedWorkspace) {
      return;
    }
    try {
      await createBoard(context?.token, {
        name: boardTitle,
        workspaceUuid: localSelectedWorkspace,
      });
      setBoardTitle("");
      setSelectedWorkspace("");
    } catch (error) {
      console.error("Error creating board:", error);
    }
  };
  if (!context) return null;

  return (
    <div
      className={`container absolute z-10 overflow-y-auto right-0 ${
        isVisible ? "hidden" : "block"
      } bg-foreground text-background rounded-lg w-[310px] h-[540px]`}
      style={{ top, left }}
    >
      <div className="image-container items-center gap-2 flex flex-col mt-5 relative">
        <div className="flex flex-row justify-center">
          <div>Create board</div>
          <Button
            isIconOnly
            className="bg-inherit text-black absolute top-1 right-1"
            onClick={setVisi}
          >
            X
          </Button>
        </div>
        <Image
          src="https://images.unsplash.com/photo-1548630826-2ec01a41f48f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="some background image"
          width={190}
          height={100}
          className="rounded-lg"
        />
        <div className="font-semibold">Board cover</div>
        <div className="flex flex-row gap-1"></div>
        <div className="flex flex-col gap-2 mt-5">
          <Input
            isRequired
            type="text"
            size="sm"
            label="Board title"
            className="text-foreground"
            onChange={(e) => setBoardTitle(e.target.value)}
          ></Input>
          <div className="flex flex-row items-center">
            <Select
              isRequired
              size="sm"
              label="Workspace"
              placeholder="Select a workspace"
              className="max-w-xs text-foreground w-[280px]"
              onChange={(event) =>
                setLocalSelectedWorkspace(event.target.value)
              }
            >
              {workspaces.map((workspace) => (
                <SelectItem
                  className="text-foreground"
                  key={workspace.uuid}
                  value={workspace.uuid}
                >
                  {workspace.name}
                </SelectItem>
              ))}
            </Select>
          </div>
          <Button
            onPress={() => {
              handleCreateBoard();
            }}
            onClick={setVisi}
            className="items-center"
            color="primary"
            variant="solid"
            isDisabled={!boardTitle || !localSelectedWorkspace}
          >
            Create
          </Button>
        </div>
        <p className="text-sm flex items-center justify-center ml-1">
          By using images from Unsplash, you agree to their license and Terms of
          Service
        </p>
      </div>
    </div>
  );
};

export default NewBoardPopUp;
