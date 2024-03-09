"use client";
import { Avatar, AvatarGroup, Button } from "@nextui-org/react";
import React, { useContext, useEffect, useRef, useState } from "react";
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
import { userList } from "@/lib/v2/users";
import { User } from "@/types";

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
  const [userInfoVisible, setUserInfoVisible] = useState(false);
  const [currentUsers, setCurrentUsers] = useState([] as any);
  const [userCardContent, setUserCardContent] = useState([] as any);
  const ref = useRef(null);
  const users = workspaces.find(
    (workspace) => workspace.uuid === selectedWorkspace
  )?.users;
  const handleUserDataChange = (user: any) => {
    setUserCardContent(user);
  };
  const fetchUsers = async (token: any) => {
    try {
      const res = await userList.getAllUsers(token);
      setCurrentUsers(res?.users.data);
    } catch (error: unknown) {
      console.error("Error while trying to fetch users: ", error);
    }
  };
  console.log("currentUsers", currentUsers);
  const emailShortener = (email: string) => {
    if (email) {
      const atIndex = email.indexOf("@");
      if (atIndex !== -1) {
        return email.substring(0, atIndex);
      } else {
        return email;
      }
    }
  };
  useEffect(() => {
    fetchUsers(token);
  }, [token]);

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
                  src={
                    userCardContent?.image ||
                    "https://avatarfiles.alphacoders.com/324/324846.jpg"
                  }
                  alt="user-avatar"
                  onClick={() => {
                    console.log("display user details here");
                  }}
                />
                <div className="flex flex-col mb-2 text-black">
                  <div className="font-semibold">
                    {userCardContent?.fullName}
                  </div>
                  <div>@{emailShortener(userCardContent?.email)}</div>
                </div>
              </div>
            </PopUpBody>
            <div className="bg-white rounded-b-lg h-[55%] flex items-center justify-center">
              Content
            </div>
          </PopUpWrapper>
        </div>
        <AvatarGroup size="sm" className="hover:cursor-pointer">
          {currentUsers?.map((user: any) => {
            return (
              <Avatar
                isBordered
                key={user.uuid}
                src={user.avatar}
                onClick={() => {
                  setUserInfoVisible(true), handleUserDataChange(user);
                }}
              />
            );
          })}
        </AvatarGroup>
      </div>
    </div>
  );
};

export default BoardNav;
