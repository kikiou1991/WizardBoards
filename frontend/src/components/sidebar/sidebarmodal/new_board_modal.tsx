"use client";
import React, { useContext, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import Icon from "@/components/Icons";
import { UserContext, UserContextType } from "@/contexts/Usercontext";
import { BoardContext, BoardContextType } from "@/contexts/BoardContext";
import {
  WorkspaceContext,
  WorkspaceContextType,
} from "@/contexts/WorkspaceContext";

interface Props {
  iconName: string;
}

const MyModalNewBoard = ({ iconName }: Props) => {
  const [isBoardModalOpen, setBoardModalOpen] = useState(false);
  const [isWorkspaceModalOpen, setWorkspaceModalOpen] = useState(false);
  const [boardTitle, setBoardTitle] = useState("");
  const context = useContext(UserContext);
  const { workspaces, localSelectedWorkspace, setLocalSelectedWorkspace } =
    useContext(WorkspaceContext) as WorkspaceContextType;
  const { createBoard } = useContext(BoardContext) as BoardContextType;
  const openBoardModal = () => {
    setBoardModalOpen(true);
    setWorkspaceModalOpen(false);
  };

  const openWorkspaceModal = () => {
    setBoardModalOpen(false);
    setWorkspaceModalOpen(true);
  };

  const closeModals = () => {
    setBoardModalOpen(false);
    setWorkspaceModalOpen(false);
  };

  const handleCreateBoard = async () => {
    if (!boardTitle) {
      return;
    }
    if (!localSelectedWorkspace) {
      return;
    }

    try {
      await createBoard(context?.token, {
        name: boardTitle,
        workspaceUuid: localSelectedWorkspace,
      });
      closeModals();
    } catch (error) {
      console.error("Error creating board:", error);
    }
  };

  if (!context) return null;

  return (
    <>
      <Icon name={iconName} onClick={openBoardModal} />
      <Modal
        isOpen={isBoardModalOpen}
        onClose={closeModals}
        backdrop="blur"
        radius="lg"
        classNames={{
          body: "py-6 border-foreground",
          backdrop: "bg-secondayBG/50 backdrop-opacity-40",
          base: "border-foreground bg-primary dark:bg-background text-foreground",
          header: "border-b-[1px] border-border",
          footer: "border-t-[1px] border-border",

          closeButton: "hover:bg-white/5 active:bg-transparent",
        }}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1 items-center align-middle ">
            <h1 className="">Create Board</h1>
          </ModalHeader>
          <ModalBody className=" ">
            <Input
              isRequired
              type="email"
              label="Board Title"
              description="Name your new board"
              className="max-w-xs font-semibold text-foreground"
              color="default"
              labelPlacement="outside"
              value={boardTitle}
              onChange={(e) => setBoardTitle(e.target.value)}
            />
            <div className="flex flex-row items-center">
              <Select
                isRequired
                size="sm"
                label="Workspace"
                placeholder="Select a workspace"
                className="max-w-xs text-foreground "
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
          </ModalBody>
          <ModalFooter className="">
            {/* Sumbit button so add new */}
            <Button
              onPress={handleCreateBoard}
              className="items-center"
              color="primary"
              variant="solid"
            >
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MyModalNewBoard;
