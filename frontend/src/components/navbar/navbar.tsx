"use client";
import Icon from "@/components/Icons";
import {
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

interface UserData {
  name: string;
  email: string;
  fullName: string;
}
interface Workspace {
  uuid: string;
  name: string;
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
  // State to store selected workspace
  console.log("current workspaces", workspaces);

  const handleWorkspaceChange = (workspaceId: string) => {
    setSelectedBoard("");
    setSelectedWorkspace(workspaceId);
    setIsBoardSelectedGlobal(false);
  };

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
          "https://wizardboards.co.uk/api/users/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          //fetch the user data
          const userData = await response.json();

          setUser(userData);
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

  return (
    <Navbar
      isBordered
      className=" cursor-pointer border-b-[2px] border-border text-foreground bg-background flex flex-row px-5"
      classNames={{ base: "w-screen", wrapper: "w-screen max-w-none px-0" }}
    >
      {/* Left navigation section icon, header, and add button */}
      <NavbarContent className="items-center flex flex-grow-0 gap-1  justify-start ">
        {/* File / Other Products / Navigation */}
        <Dropdown
          className="bg-background text-foreground hover:bg-secondaryBG"
          placement="bottom-start"
        >
          <DropdownTrigger>
            <Button
              className="bg-inherit hover:bg-secondaryBG "
              size="sm"
              isIconOnly
            >
              <Icon
                name="menu"
                classname={"bg-white data-[hover=true]:bg-background"}
              />
            </Button>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownSection className="group/item data-[hover=true]:bg-secondaryBG">
              <DropdownItem>Contact us</DropdownItem>
              <DropdownItem>Subscribe</DropdownItem>
              <DropdownItem>Sign out</DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
        {/* Logo */}
        <div className="p-2 flex flex-row items-center">
          <Icon name="projectIcon" classname={"bg-white"} />
          <Link href="/workspace/home" className="pl-1">
            WizarBoards
          </Link>
        </div>

        {/*DropDown For WorkSpaces */}
        {workspaces.length > 0 && (
          <Dropdown
            key="workspacesDropdown"
            className="bg-background text-foreground "
            placement="bottom-start"
          >
            <DropdownTrigger>
              <div className="flex gap-1 items-center hover:bg-secondaryBG p-2 rounded-md">
                <p>Workspaces</p>
                <Icon name="downarrow" classname={"bg-white"} />
              </div>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownSection
                className="bg-inherit hover:bg-secondaryBG"
                showDivider
              >
                <DropdownItem
                  className="flex flex-row flex-nowrap"
                  style={{ minWidth: "200px" }}
                >
                  <div className="flex flex-row items-center">
                    <div className="flex rounded-md w-[30px] h-[30px] font-bold text-xl  items-center px-1 m-1 justify-center text-foreground bg-gradient-to-r from-sky-500 to-indigo-500">
                      {
                        workspaces.find((w) => w.uuid === selectedWorkspace)
                          ?.name[0]
                      }
                    </div>
                    <p className="p-2 text-lg">
                      {workspaces.length > 0 &&
                        workspaces.find((w) => w.uuid === selectedWorkspace)
                          ?.name}
                    </p>
                  </div>
                </DropdownItem>
              </DropdownSection>
              <DropdownSection>
                {workspaces.map((workspace: any) => (
                  <DropdownItem
                    key={workspace.uuid}
                    onClick={() => {
                      handleWorkspaceChange(workspace.uuid);
                    }}
                    className={`flex flex-row py-2 px-2 group/item h-10 `}
                  >
                    <Link href="/workspace/projects">{workspace.name}</Link>
                  </DropdownItem>
                ))}
              </DropdownSection>
            </DropdownMenu>
          </Dropdown>
        )}
        <Dropdown
          className="bg-background text-foreground"
          placement="bottom-start"
        >
          <DropdownTrigger>
            <div className="flex gap-1 items-center  hover:bg-secondaryBG p-2 rounded-md">
              <p>Starred</p>
              <Icon name="downarrow" classname={"bg-white"} />
            </div>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownSection>
              {favorites.map((favorite: any) => (
                <DropdownItem
                  key={favorite.uuid}
                  className={`flex flex-row py-2 px-1 group/item h-10 `}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <div className="bg-inherit flex flex-row  group/item items-center flex-nowrap">
                    {/* Add logic here to route favorite boards to their respective pages
                     */}
                    <div
                      className="flex flex-row gap-2 flex-grow w-full px-2 text-base"
                      onClick={() => {}}
                    >
                      <Image
                        className="rounded"
                        src={favorite.imageLink}
                        width={40}
                        height={32}
                        alt="board-background"
                      />
                      <Link href="/workspace/projects">
                        <p>
                          {favorite.name.length > 12
                            ? `${favorite.name.substring(0, 12)}...`
                            : favorite.name}
                        </p>
                        <p>{favorite?.workspace?.name}</p>
                      </Link>
                    </div>
                    <div className="flex flex-grow-0">
                      <Button
                        className="bg-inherit visible transform transition-transform hover:scale-110 "
                        size="sm"
                        isIconOnly
                      >
                        <Icon name="starYellow" classname="" />
                      </Button>
                    </div>
                  </div>
                </DropdownItem>
              ))}
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
        <MyWorkSpaceModal />
      </NavbarContent>

      {/* Empty space between left and right sections */}
      <div className={` flex-grow ${isOpen ? "" : "hidden"}`}>
        {/* <WorkspaceModal ref={ref} /> */}
      </div>
      {/* <Button onClick={toggleModals} className='bg-white text-black'>
        Modal
      </Button> */}

      {/* Right section with modal, calendar, notification, and profile */}
      <NavbarContent
        className=" flex  bg-inherit gap-3 "
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

        {/* Social Media Links */}
        <div className="hidden sm:flex pr-1">
          <Socials />
        </div>

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
