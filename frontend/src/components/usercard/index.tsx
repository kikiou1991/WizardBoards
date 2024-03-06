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
      className="text-foreground rounded-md m-1 flex flex-row p-2 bg-blue-600 items-center gap-2"
    >
      {" "}
      <Avatar
        as="button"
        className="transition-transform p"
        size="sm"
        src="https://t3.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
      />
      <p className="text-black font-semibold">
        {user ? user.fullName : "Anonymus..."}
      </p>
    </div>
  );
};

export default UserCard;
