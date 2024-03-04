import { Avatar, Textarea } from "@nextui-org/react";
import React from "react";

interface CommentProps {
  text?: string;
  user?: string;
  profilePic?: string;
}

const Comment = ({ text }: CommentProps) => {
  return (
    <div className="flex flex-row gap-2 items-center">
      <Avatar
        as="button"
        className="transition-transform p"
        size="sm"
        src="https://t3.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
      />
      <p className="">{text}</p>
    </div>
  );
};

export default Comment;
