import Icon from "@/components/Icons";
import { UserContext, UserContextType } from "@/contexts/Usercontext";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useContext, useState } from "react";
import MyModalNewBoard from "../sidebar/sidebarmodal/new_board_modal";
import { BoardContext, BoardContextType } from "@/contexts/BoardContext";
import {
  WorkspaceContext,
  WorkspaceContextType,
} from "@/contexts/WorkspaceContext";

interface Workspace {
  uuid: string;
  name: string;
}

const MyWorkSpaceModal = () => {
  const [isBoardModalOpen, setBoardModalOpen] = useState(false);
  const [isWorkspaceModalOpen, setWorkspaceModalOpen] = useState(false);
  const [boardTitle, setBoardTitle] = useState("");
  const [selectedWorkspace, setSelectedWorkspace] = useState<string | null>("");
  const [workSpaceTitle, setWorkSpaceTitle] = useState("");
  const context = useContext(UserContext);
  const { workspaces, createWorkspace } = useContext(
    WorkspaceContext
  ) as WorkspaceContextType;
  const { createBoard } = useContext(BoardContext) as BoardContextType;

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
    if (!selectedWorkspace) {
      return;
    }
    try {
      await createBoard(context?.token, {
        name: boardTitle,
        workspaceUuid: selectedWorkspace,
      });
      closeModals();
    } catch (error) {
      console.error("Error creating board:", error);
    }
  };

  const handleCreateWorkspace = async () => {
    if (!workSpaceTitle) {
      return;
    }
    try {
      await createWorkspace(context?.token, { name: workSpaceTitle });
      closeModals();
    } catch (error) {
      console.error("Error creating workspace:", error);
    }
  };

  if (!context) return null;

  return (
    <>
      <Dropdown
        className="bg-background text-foreground w-"
        placement="bottom-start"
        closeOnSelect={false}
        aria-label="aria class"
      >
        <DropdownTrigger
          aria-label="aria class"
          className=" hover:bg-cards p-1 rounded-md text-base"
        >
          <Button size="md">
            <p>Create</p>
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="aria class">
          <DropdownSection aria-label="aria class">
            <DropdownItem
              aria-label="aria class"
              className="data-[hover=true]:bg-secondaryBG"
              description="A board is made up of cards ordered on lists."
              startContent={<MyModalNewBoard iconName="addBoard" />}
            >
              <p>Create new board</p>
            </DropdownItem>
            <DropdownItem
              aria-label="aria class"
              className="data-[hover=true]:bg-secondaryBG"
              description="A workspace is a group of boards and people."
              startContent={<Icon name="addWorkspace" />}
              onClick={openWorkspaceModal}
            >
              <p>Create Workspace</p>
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>

      {/* Render Board Modal */}
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
          <ModalHeader className="flex flex-col gap-1 items-center align-middle">
            <h1>Create Board</h1>
          </ModalHeader>
          <ModalBody>
            <Input
              isRequired
              type="email"
              label="Board Title"
              description="Name your new board"
              className="max-w-xs font-semibold text-slate-100"
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
                onChange={(value: any) => setSelectedWorkspace(value)}
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
          <ModalFooter>
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

      {/* Render Workspace Modal */}
      <Modal
        size="lg"
        isOpen={isWorkspaceModalOpen}
        onClose={closeModals}
        backdrop="blur"
        radius="lg"
        classNames={{
          body: "py-5 px-2",
          backdrop: "bg-background/50 backdrop-opacity-50",
          base: "border-foreground bg-bacckground dark:bg-background text-foreground",
          header: "border-b-[1px] border-[#041A42]",
          footer: "border-t-[1px] border-[#041A42]",
          closeButton: "hover:bg-white/5 active:bg-white/10",
        }}
      >
        <ModalContent>
          <ModalBody className="">
            <div className="flex flex-col gap-2 items-center justify-center">
              <h2 className="py-2 text-xl">Let`s build a Workspace</h2>
              <div className="">
                <h3 className="">Name your workspace and let`s get started.</h3>
              </div>
              <Input
                type="email"
                label="Workspace name"
                labelPlacement="outside"
                placeholder="Hufflepuff"
                description="This is the name of your company, team, or organization."
                className="py-2 gap-1"
                classNames={{
                  base: "max-w-full sm:max-w-[20rem] h-10",
                  mainWrapper: "h-full ",
                  input: "text-small text-foreground",
                  inputWrapper:
                    "data-[hover=true]:bg-none h-full font-normal text-[#090607] bg-secondaryBG hover:bg-slate-200/80",
                }}
                value={workSpaceTitle}
                onChange={(e) => setWorkSpaceTitle(e.target.value)}
              />
            </div>
          </ModalBody>
          <ModalFooter className="border-none justify-center">
            <Button
              className="items-center"
              onPress={handleCreateWorkspace}
              size="md"
              color="primary"
              isDisabled={false}
            >
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MyWorkSpaceModal;
