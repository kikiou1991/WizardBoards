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
        <div className="flex flex-row gap-2 flex-grow ">
          <Icon name="board" />
          <Link href="/workspace/projects">Boards</Link>
        </div>
      </div>
      <div className="h-8 flex flex-row gap-2 items-center hover:bg-secondaryBG pl-2">
        <div className="flex flex-row gap-2 flex-grow ">
          <Icon name="members" />
          <Link href="/workspace/members">Members</Link>
        </div>
        <div className="pr-1">
          <MyModalEmail name="addIcon" />
        </div>
      </div>
      <div className="h-8 flex flex-row  hover:bg-secondaryBG  pl-2 ">
        <div className="flex flex-row gap-2 flex-grow">
          <Icon name="settings" classname="p-1" />
          <Link href="/workspace/settings" className="font-semibold">
            Settings
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BoardView;
