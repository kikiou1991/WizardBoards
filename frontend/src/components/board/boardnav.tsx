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
import PopUpWrapper from "../CustomPopUp/Wrapper";
import PopUpBody from "../CustomPopUp/Body";
import Image from "next/image";

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
  const [userInfoVisible, setUserInfoVisible] = useState(true);
  const ref = useRef(null);
  const users = workspaces.find(
    (workspace) => workspace.uuid === selectedWorkspace
  )?.users;

  console.log(users);
  //we need to fetch all users from the backend that belong to this workpsace
  //next we need to store their avatar, email
  //we then show the avatars in the boardnav
  //if we click on an avatar we should be able to see the user details

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
    <div className="flex flex-row items-center justify-start flex-wrap">
      <div className="flex justify-between text-foreground items-center ">
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

      <div className="flex ml-auto py-2 ">
        <div className={`relative ${userInfoVisible ? "block " : "hidden"}`}>
          <PopUpWrapper classNames="bg-blue-500 fixed h-[190px] w-[280px] top-32  right-4 z-20 ">
            <Button
              className="ml-auto bg-inherit text-black rounded-full hover:bg-foreground flex flex-end mt-1 h-[15%]"
              isIconOnly
              size="sm"
              onClick={() => {
                setUserInfoVisible(false);
              }}
            >
              X
            </Button>
            <PopUpBody classNames="flex flex-col  items-center ml-8 h-[30%]">
              <div className="flex flex-row items-center w-full m-1 gap-3 h-[95%]">
                <Image
                  className="rounded-full 3xl hover:cursor-pointer border-2 border-white"
                  width={80}
                  height={90}
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                  alt="user-avatar"
                  onClick={() => {
                    console.log("clicked");
                  }}
                />
                <div className="flex flex-col mb-2 text-black">
                  <div className="font-semibold">Ashoka Tano</div>
                  <div>@ashokatano</div>
                </div>
              </div>
            </PopUpBody>
            <div className="bg-white rounded-b-lg h-[55%] flex items-center justify-center">
              Content
            </div>
          </PopUpWrapper>
        </div>
        <AvatarGroup size="sm" className="hover:cursor-pointer">
          {/* here we will map through the array we get and display an avatar, when it is clicked it will show the user card details component */}
          <Avatar
            onClick={() => {
              setUserInfoVisible(true);
            }}
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          />
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
