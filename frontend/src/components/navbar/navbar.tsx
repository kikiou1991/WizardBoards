"use client";
import Icon from "@/components/Icons";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Navbar,
  NavbarContent,
} from "@nextui-org/react";
import Image from "next/image";
import React, { useContext, useEffect, useRef, useState } from "react";
import MyModal from "../modals/modal";
import MyWorkSpaceModal from "../modals/newworkspace_modal";

import { UserContext, UserContextType } from "@/contexts/Usercontext";
import Link from "next/link";
import useOutsideClick from "../customHooks/useOutsideClick";
import NotificationWindow from "../notifications/notiWindow";
import Profile from "./profile";
import Socials from "./socials";
import {
  WorkspaceContext,
  WorkspaceContextType,
} from "@/contexts/WorkspaceContext";
import { BoardContext, BoardContextType } from "@/contexts/BoardContext";
import NavMenuDesktop from "../NavMenu";
import NewBoardPopUp from "../newboardpopup";
import PopUpBody from "../CustomPopUp/Body";
import PopUpWrapper from "../CustomPopUp/Wrapper";
import UserCard from "../usercard";
import projectConfig from "../projectConfig";

interface UserData {
  name: string;
  email: string;
  fullName: string;
}

const NavbarTop = () => {
  const [user, setUser] = React.useState<UserData | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { setSelectedWorkspace, workspaces, selectedWorkspace } = useContext(
    WorkspaceContext
  ) as WorkspaceContextType;
  const { setSelectedBoard, setIsBoardSelectedGlobal, favorites } = useContext(
    BoardContext
  ) as BoardContextType;
  const ref = useRef(null);

  const handleOpenNotificationWindow = () => {
    setIsVisible(!isVisible);
  };

  const closeNotificationWindow = () => {
    setIsVisible(false);
  };

  const toggleModals = () => {
    setIsOpen(!isOpen);
  };
  useOutsideClick(ref, closeNotificationWindow);
  useOutsideClick(ref, toggleModals);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        //retrieve the stored token
        const token = localStorage.getItem("token");

        if (!token) {
          return;
        }
        //use the token to get the user info
        const response = await fetch(
          `${projectConfig.apiBaseUrl}/v2/validate`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          //fetch the user data
          const userData = await response.json();

          setUser(userData.data);
        } else {
          //handle user fetch errors
          console.error("Failed to fetch user data", response.statusText);
        }
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    };
    fetchUserData();
  }, []);

  //This section will move, its only for testing purposes

  return (
    <Navbar
      isBordered
      className=" cursor-pointer border-b-[2px] border-border text-foreground bg-background flex flex-row px-5"
      classNames={{ base: "w-screen", wrapper: "w-screen max-w-none px-0" }}
    >
      {/* Left navigation section while screensize is large */}
      <NavMenuDesktop />

      {/* Empty space between left and right sections */}
      <div className={` flex-grow `}></div>
      {/* <Button onClick={toggleModals} className='bg-white text-black'>
        Modal
      </Button> */}

      {/* Right section with modal, calendar, notification, and profile */}
      <NavbarContent
        className=" flex bg-inherit gap-3 "
        style={{ flexGrow: "0" }}
      >
        {/* Model Section SearchBar */}
        <div ref={ref} className={`${isVisible ? "" : "hidden"} p-0 m-0`}>
          <NotificationWindow />
        </div>
        <MyModal />

        {/* Calendar and Notifications */}

        <Button
          onClick={handleOpenNotificationWindow}
          className="bg-inherit hover:bg-secondaryBG px-1"
          size="sm"
          isIconOnly
        >
          <Icon name="notiBell" classname={"stroke-current "} />
        </Button>

        {/*Profile Navigation / Logout / Profile settings */}

        <Profile
          name={user ? user.fullName : "Anonymus..."}
          email={user ? user.email : "Loading..."}
        />
      </NavbarContent>
    </Navbar>
  );
};

export default NavbarTop;
