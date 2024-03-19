import { Avatar } from "@nextui-org/react";
import React from "react";

type User = {
  fullName: string;
  image: string;
};
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
        {user ? user.fullName : "Anonymous..."}
      </p>
    </div>
  );
};

export default UserCard;
