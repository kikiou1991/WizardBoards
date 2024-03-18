import { BoardContext, BoardContextType } from "@/contexts/BoardContext";
import { UserContext } from "@/contexts/Usercontext";
import {
  WorkspaceContext,
  WorkspaceContextType,
} from "@/contexts/WorkspaceContext";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import Icon from "../Icons";
import { imageUrls } from "@/lib/imagesData";
import toast from "react-hot-toast";
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
  const [isSelected, setIsSelected] = useState(true);
  const [selectedImg, setSelectedImg] = useState<"2" | "3" | "4" | "5">("2");
  const [newBoardImg, setNewBoardImg] = useState("");
  const context = useContext(UserContext);
  const handleImageSelect = (id: any) => {
    setSelectedImg(id);
  };
  useEffect(() => {
    if (selectedImg !== null) {
      setNewBoardImg(imageUrls[selectedImg]);
    }
  }, [selectedImg]); //when the selected image changes, we set the new board image

  const handleCreateBoard = async () => {
    if (!boardTitle || !localSelectedWorkspace) {
      return;
    }
    try {
      await createBoard(context?.token, {
        name: boardTitle,
        image: newBoardImg,
        workspaceUuid: localSelectedWorkspace,
      });
      toast.success("Board created successfully");
      setBoardTitle("");
      setSelectedWorkspace("");
    } catch (error) {
      console.error("Error creating board:", error);
    }
  };
  if (!context) return null;

  return (
    <div
      className={`container absolute z-50 overflow-y-auto right-0 ${
        isVisible ? "hidden" : "block"
      } bg-background text-foreground border-foreground border-1 shadow-md rounded-lg w-[310px] h-[565px] `}
      style={{ top, left }}
    >
      {" "}
      <Button
        isIconOnly
        size="sm"
        className="bg-inherit absolute z-20 top-1 right-1 rounded-full hover:bg-secondaryBG text-foreground"
        onClick={setVisi}
        onPress={() => setSelectedImg("2")}
      >
        X
      </Button>
      <div className="image-container items-center gap-2 flex flex-col mt-5 relative">
        <div className="flex flex-row justify-center">
          <div>Create board</div>
        </div>
        <Image
          src={imageUrls[selectedImg || "2"]}
          alt="some background image"
          id="2"
          width={100}
          height={100}
          style={{ width: "200px", height: "120px" }}
          className="rounded-lg"
        />
        <div className="font-semibold">Board cover</div>
        <div className="flex flex-row gap-1 mx-4">
          <div className="relative">
            <Image
              src="https://images.unsplash.com/photo-1548630826-2ec01a41f48f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="some background image"
              id="2"
              width={100}
              height={100}
              style={{ width: "70px", height: "50px" }}
              className={`rounded-lg border-2 ${
                selectedImg === "2" ? "border-primary" : "border-transparent"
              }`}
              onClick={() => handleImageSelect("2")}
            />
            {selectedImg === "2" && (
              <div className="absolute top-3 left-5 text-primary font-semibold">
                <Icon name="tickSymbol" />
              </div>
            )}
          </div>
          <div className="relative">
            <Image
              src="https://images.unsplash.com/photo-1539103377911-4909a1eae382?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="some background image"
              id="3"
              width={100}
              height={100}
              style={{ width: "70px", height: "50px" }}
              className={`rounded-lg border-3 ${
                selectedImg === "3" ? "border-primary" : "border-transparent"
              }`}
              onClick={() => handleImageSelect("3")}
            />
            {selectedImg === "3" && (
              <div className="absolute top-3 left-5 text-primary font-semibold">
                <Icon name="tickSymbol" />
              </div>
            )}
          </div>
          <div className="relative">
            <Image
              src="https://images.unsplash.com/photo-1618944847023-38aa001235f0?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="some background image"
              id="4"
              width={100}
              height={100}
              style={{ width: "70px", height: "50px" }}
              className={`rounded-lg border-2 ${
                selectedImg === "4" ? "border-primary" : "border-transparent"
              }`}
              onClick={() => handleImageSelect("4")}
            />
            {selectedImg === "4" && (
              <div className="absolute top-3 left-5 text-primary font-semibold">
                <Icon name="tickSymbol" />
              </div>
            )}
          </div>
          <div className="relative">
            <Image
              src="https://images.unsplash.com/photo-1515816052601-210d5501d471?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="some background image"
              id="5"
              width={100}
              height={100}
              style={{ width: "70px", height: "50px" }}
              className={`rounded-lg border-2 ${
                selectedImg === "5" ? "border-primary" : "border-transparent"
              }`}
              onClick={() => handleImageSelect("5")}
            />
            {selectedImg === "5" && (
              <div className="absolute top-3 left-5 text-primary font-semibold">
                <Icon name="tickSymbol" />
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-3 mt-5">
          <Input
            autoFocus
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
            className="items-center p-0 mt-2"
            color="primary"
            variant="solid"
            isDisabled={!boardTitle || !localSelectedWorkspace}
          >
            Create
          </Button>
        </div>
        <p className="text-sm flex px-2 my-2 items-center justify-center ml-1">
          By using images from Unsplash, you agree to their license and Terms of
          Service
        </p>
      </div>
    </div>
  );
};

export default NewBoardPopUp;
