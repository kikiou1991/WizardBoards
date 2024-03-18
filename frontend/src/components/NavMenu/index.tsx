import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  NavbarContent,
} from "@nextui-org/react";
import React, { useContext, useState } from "react";
import MyWorkSpaceModal from "../modals/newworkspace_modal";
import Link from "next/link";
import Icon from "../Icons";
import {
  WorkspaceContext,
  WorkspaceContextType,
} from "@/contexts/WorkspaceContext";
import { BoardContext, BoardContextType } from "@/contexts/BoardContext";
import Image from "next/image";
import { UserContext, UserContextType } from "@/contexts/Usercontext";
import NewBoardPopUp from "../newboardpopup";
import { CardContext, CardContextType } from "@/contexts/CardContext";

const NavMenuDesktop = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { handleLogout } = useContext(CardContext) as CardContextType;

  const { workspaces, selectedWorkspace, setSelectedWorkspace } = useContext(
    WorkspaceContext
  ) as WorkspaceContextType;
  const { setSelectedBoard, setIsBoardSelectedGlobal, favorites } = useContext(
    BoardContext
  ) as BoardContextType;

  const handleWorkspaceChange = (workspaceId: string) => {
    setSelectedBoard("");
    setSelectedWorkspace(workspaceId);
    setIsBoardSelectedGlobal(false);
  };

  return (
    <>
      {" "}
      <NavbarContent
        aria-label="aria class"
        className="items-center flex flex-grow-0 gap-1  justify-start "
      >
        {/* File / Other Products / Navigation */}
        <Dropdown
          aria-label="aria class"
          className="bg-background text-foreground hover:bg-secondaryBG"
          placement="bottom-start"
        >
          <DropdownTrigger aria-label="aria class">
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
          <DropdownMenu aria-label="aria class">
            <DropdownSection
              aria-label="aria class"
              className="group/item data-[hover=true]:bg-secondaryBG"
            >
              <DropdownItem aria-label="aria class">
                <a href="/workspace/contact">Contact us</a>
              </DropdownItem>

              <DropdownItem aria-label="aria class">
                <a onClick={handleLogout}>Sign out</a>
              </DropdownItem>
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
        {workspaces.length > 0 ? (
          <Dropdown
            aria-label="aria class"
            key="workspacesDropdown"
            className="bg-background text-foreground "
            placement="bottom-start"
          >
            <DropdownTrigger aria-label="aria class">
              <div className="flex gap-1 items-center hover:bg-secondaryBG p-2 rounded-md">
                <p>Workspaces</p>
                <Icon name="downarrow" classname={"bg-white"} />
              </div>
            </DropdownTrigger>
            <DropdownMenu aria-label="aria class">
              <DropdownSection
                aria-label="aria class"
                className="bg-inherit hover:bg-secondaryBG"
                showDivider
              >
                <DropdownItem
                  aria-label="aria class"
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
              <DropdownSection aria-label="aria class">
                {workspaces.map((workspace: any) => (
                  <DropdownItem
                    aria-label="aria class"
                    key={workspace.uuid}
                    onClick={() => {
                      handleWorkspaceChange(workspace.uuid);
                    }}
                    className={`flex flex-row items-center py-2 px-2 group/item h-10 `}
                  >
                    <Link href="/workspace/projects">{workspace.name}</Link>
                  </DropdownItem>
                ))}
              </DropdownSection>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <Dropdown
            placement="bottom-start"
            aria-class="empty workspace"
            className="text-foreground"
          >
            <DropdownTrigger aria-label="aria class">
              <div className="flex gap-1 items-center hover:bg-secondaryBG p-2 rounded-md">
                <p>Workspaces</p>
                <Icon name="downarrow" classname={"bg-white"} />
              </div>
            </DropdownTrigger>
            <DropdownMenu aria-label="aria class">
              <DropdownSection
                style={{ minWidth: "200px" }}
                aria-label="empty workpsaces"
              >
                <DropdownItem
                  aria-label="aria class"
                  className={`flex flex-row items-center py-2 px-2 group/item h-10 `}
                >
                  <div>
                    <p>Create your first workspace</p>
                  </div>
                </DropdownItem>
              </DropdownSection>
            </DropdownMenu>
          </Dropdown>
        )}
        <Dropdown
          className="bg-background text-foreground"
          placement="bottom-start"
        >
          <DropdownTrigger aria-label="aria class">
            <div className="flex gap-1 items-center  hover:bg-secondaryBG p-2 rounded-md">
              <p>Starred</p>
              <Icon name="downarrow" classname={"bg-white"} />
            </div>
          </DropdownTrigger>
          <DropdownMenu aria-label="aria class">
            {favorites.length === 0 ? (
              <DropdownSection aria-label="aria class">
                <DropdownItem
                  aria-label="aria class"
                  className="flex flex-row py-2 px-2 group/item h-10 "
                >
                  <div>
                    <p>Star a board to access them quickly and easily.</p>
                  </div>
                </DropdownItem>
              </DropdownSection>
            ) : (
              <DropdownSection aria-label="aria class">
                {favorites.map((favorite: any) => (
                  <DropdownItem
                    aria-label="aria class"
                    key={favorite?.uuid}
                    className={`flex flex-row items-center py-2 px-1 group/item h-10 `}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    <div className="bg-inherit flex flex-row  group/item items-center flex-nowrap">
                      {/* Add logic here to route favorite boards to their respective pages
                       */}
                      <div
                        className="flex flex-row items-center gap-2 flex-grow w-full px-2 text-base"
                        onClick={() => {}}
                      >
                        <Image
                          className="rounded"
                          src={favorite?.imageLink}
                          width={40}
                          height={32}
                          alt="board-background"
                        />
                        <Link href="/workspace/projects">
                          <p>
                            {favorite?.name.length > 12
                              ? `${favorite?.name.substring(0, 12)}...`
                              : favorite?.name}
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
                          <Icon
                            name={favorite?.isStared ? "starYellow" : "star"}
                            classname={
                              favorite?.isStared
                                ? "fill-warning"
                                : "fill-current"
                            }
                          />
                        </Button>
                      </div>
                    </div>
                  </DropdownItem>
                ))}
              </DropdownSection>
            )}
          </DropdownMenu>
        </Dropdown>

        <MyWorkSpaceModal />
      </NavbarContent>
    </>
  );
};

export default NavMenuDesktop;
