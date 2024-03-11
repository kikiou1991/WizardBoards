"use client";
import Icon from "@/components/Icons";

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/react";

import MyModalEmail from "../sidebarmodal/newmember_modal";
import Link from "next/link";

const BoardView = () => {
  return (
    <div className="gap-1 flex flex-col ">
      <div className="h-8 flex flex-row gap-2 hover:bg-secondaryBG items-center  px-2">
        <Link href="/workspace/projects">
          <div className="flex flex-row gap-2 flex-grow ">
            <Icon name="board" />
            {"Boards"}
          </div>
        </Link>
      </div>
      <div className="h-8 flex flex-row gap-2 items-center  hover:bg-secondaryBG pl-2">
        <Link href="/workspace/members">
          <div className="flex flex-row gap-2 flex-grow ">
            <Icon name="members" />
            <p>Members</p>
          </div>
        </Link>
        <div className="mr-2 ml-auto hover:cursor-pointer">
          <MyModalEmail name="addIcon" />
        </div>
      </div>
      <div className="h-8 flex flex-row items-center  hover:bg-secondaryBG  pl-2 ">
        <Link href="/workspace/settings" className="font-semibold">
          <div className="flex flex-row gap-2 flex-grow">
            <Icon name="settings" classname="p-1" />
            <p>Settings</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default BoardView;
