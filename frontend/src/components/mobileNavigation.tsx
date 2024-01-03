import React from "react";
import Image from "next/image";
import Link from "next/link";

import { Divider } from "@nextui-org/react";

export interface MenuItem {
  title: string;
  route?: string;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [

  {
    title: "Projects",
    children: [
      {
        title: "Project #1",
        route: "",
      },
      {
        title: "Project#2",
        route: "",
      },
      {
        title: "Project#3",
        route: "",
      },
    ],
  },
  {
    title: "Recent",
    children: [
        {
            title: "Project#2",
            route: ""
        },
        {
            title: "Project#3",
            route: ""
        },
    ]
  }
];

export default function NavigationMobile() {
  return (
    <header className="flex flex-col gap-10 items-center py-4 px-2">
      
      <div className="flex gap-2  items-center">
        {menuItems.map((item) => {
          return item.hasOwnProperty("children") ? (
            <>
            </>
        
          ) : (
            <Link className=""href={item?.route || ""}>
              {item.title}
            </Link>
          );
        })}
      </div>
    </header>
  );
}