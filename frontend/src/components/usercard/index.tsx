import { User } from "@/types";
import { Avatar } from "@nextui-org/react";
import React from "react";

interface UserData {
  user?: User | null;
  addUser?: () => void;
  removeUser?: () => void;
}
const UserCard = ({ user, addUser, removeUser }: UserData) => {
  return (
    <div
      onClick={() => {
        if (addUser) {
          addUser();
        }
        if (removeUser) {
          removeUser();
        }
      }}
      className="text-foreground hover:cursor-pointer rounded-md m-1 flex flex-row p-2 bg-blue-600 items-center gap-2"
    >
      <Avatar
        as="button"
        className="transition-transform p"
        size="sm"
        src={user?.image}
      />
      <p className="text-black font-semibold">
        {user ? user?.name : "Anonymous..."}
      </p>
    </div>
  );
};

export default UserCard;
