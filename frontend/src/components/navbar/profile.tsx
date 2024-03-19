"use client";
import { CardContext, CardContextType } from "@/contexts/CardContext";
import { UserContext, UserContextType } from "@/contexts/Usercontext";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Navbar,
  NavbarContent,
} from "@nextui-org/react";
import { useContext } from "react";

interface Props {
  name: string;

  email: string;
}

const Profile = ({ name, email }: Props) => {
  const { userData } = useContext(UserContext) as UserContextType;
  const { handleLogout } = useContext(CardContext) as CardContextType;
  return (
    <Navbar className="bg-background px-1" classNames={{ wrapper: "px-0" }}>
      <NavbarContent as="div" className="items-center">
        <Dropdown
          className="text-foreground"
          placement="bottom-end"
          aria-label="aria class"
        >
          <DropdownTrigger aria-label="aria class">
            <Avatar
              isBordered
              as="button"
              className="transition-transform "
              name={name}
              size="sm"
              src={
                userData?.image ||
                "https://avatarfiles.alphacoders.com/324/324846.jpg"
              }
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="aria class ">
            <DropdownSection aria-label="aria class">
              <DropdownItem>
                <a href="/workspace/account" className="py-1 px-0">
                  Account
                </a>
                <div className="sm:hidden"></div>
              </DropdownItem>
            </DropdownSection>
            <DropdownSection
              className="text-current"
              showDivider
              aria-label="aria class"
            >
              <DropdownItem className="" aria-label="aria class">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold p-0 ">{email}</p>
              </DropdownItem>
              <DropdownItem
                className="hover:bg-secondaryBG"
                aria-label="aria class"
              >
                <p className="font-semibold p-0">{name}</p>
              </DropdownItem>
            </DropdownSection>
            <DropdownSection showDivider aria-label="aria class">
              <DropdownItem
                className="hover:bg-secondaryBG"
                aria-label="aria class"
              >
                <a href="/workspace/contact" className="font-semibold">
                  Help, feedback
                </a>
              </DropdownItem>
              <DropdownItem
                className="hover:bg-secondaryBG"
                aria-label="aria class"
              >
                <a href="/workspace/settings" className="font-semibold">
                  Settings
                </a>
              </DropdownItem>
            </DropdownSection>
            <DropdownSection aria-label="aria class">
              <DropdownItem
                className="hover:bg-secondaryBG flex flex-row"
                onClick={handleLogout}
                aria-label="aria class"
              >
                <p className="font-semibold">Logout</p>
              </DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
};

export default Profile;
