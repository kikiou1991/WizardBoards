"use client";
import { Avatar, AvatarGroup, Button } from "@nextui-org/react";
import React, { useContext, useRef, useState } from "react";
import Icon from "../Icons";
import { UserContext, UserContextType } from "@/contexts/Usercontext";
import { BoardContext, BoardContextType } from "@/contexts/BoardContext";
import VisibilityModal from "../modals/visibilityModal";
import useOutsideClick from "../customHooks/useOutsideClick";
import {
  WorkspaceContext,
  WorkspaceContextType,
} from "@/contexts/WorkspaceContext";

const BoardNav = () => {
  const { token } = useContext(UserContext) as UserContextType;
  const { selectedBoard, boards, createBoard } = useContext(
    BoardContext
  ) as BoardContextType;
  const { workspaces, selectedWorkspace } = useContext(
    WorkspaceContext
  ) as WorkspaceContextType;
  const [isHovered, setIsHovered] = useState(false);
  const [visibility, setVisibility] = useState("Private" as string);
  const [isVisible, setIsVisible] = useState(false);
  const users = workspaces.find(
    (workspace) => workspace.uuid === selectedWorkspace
  )?.users;
  console.log(users);
  const ref = useRef(null);
  const toggleModal = () => {
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

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleStar = async (boardUuid: string) => {
    try {
      const selectedBoard = boards.find((board) => board.uuid === boardUuid);
      console.log("boardUuid: ", boardUuid);
      console.log("selectedBoard: ", selectedBoard?.isStared);

      await createBoard(token, {
        isStared: !selectedBoard?.isStared,
        name: selectedBoard?.name,
      });
    } catch (error) {}
  };

  const currentBoard = boards.find((board) => board.uuid === selectedBoard);

  return (
    <div className="flex flex-row items-center justify-start flex-wrap mr-5">
      <div className=" ml-2 mr-auto text-foreground flex  items-center ">
        <div className="px-3 py-0">{currentBoard?.name}</div>
        <Button
          className={`data-${
            isHovered ? "hover=true" : "hover=false"
          }:bg-secondaryBG px-2 bg-inherit transfrom transition-transform hover:scale-125`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onPress={(e) => handleStar(selectedBoard)}
          isIconOnly
        >
          {currentBoard?.isStared ? (
            <Icon name={isHovered ? "star" : "starYellow"} />
          ) : (
            <Icon name={isHovered ? "starYellow" : "star"} />
          )}
        </Button>
        <div className={`${isVisible ? "" : "hidden"} p-0 m-0`}>
          <VisibilityModal toggleModal={toggleModal} />
        </div>
        <Button
          id="changeButton"
          className="px-2 bg-inherit transfrom transition-transform hover:scale-125"
          isIconOnly
          onClick={() => {
            handleVisibilityChange();
            toggleModal();
          }}
        >
          <Icon name="groupVis" />
        </Button>
      </div>
      <div className="flex  px-2 py-2 mr-2 ml-auto">
        <AvatarGroup size="sm">
          <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
          <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
          <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
          <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
          <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
          <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
        </AvatarGroup>
      </div>
    </div>
  );
};

export default BoardNav;
