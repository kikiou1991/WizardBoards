import { Avatar } from "@nextui-org/react";
import React from "react";

type User = {
  fullName: string;
};
interface UserData {
  user?: User | null;
  addUser?: () => void;
}
const UserCard = ({ user, addUser }: UserData) => {
  return (
    <div
      onClick={addUser}
      className="text-foreground hover:cursor-pointer rounded-md m-1 flex flex-row p-2 bg-blue-600 items-center gap-2"
    >
      {" "}
      <Avatar
        as="button"
        className="transition-transform p"
        size="sm"
        src="https://avatarfiles.alphacoders.com/324/324846.jpg"
      />
      <p className="text-black font-semibold">
        {user ? user.fullName : "Anonymus..."}
      </p>
    </div>
  );
};

export default UserCard;
