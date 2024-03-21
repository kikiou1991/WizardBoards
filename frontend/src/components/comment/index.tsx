import { CardContext, CardContextType } from "@/contexts/CardContext";
import { listCards } from "@/lib/v2/cards";
import { User } from "@/types";
import { Avatar, Card, Textarea } from "@nextui-org/react";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface CommentProps {
  text?: string;
  userId?: string;
  members: User[];
}

const Comment = ({ text, userId, members }: CommentProps) => {
  const { cardDetails } = useContext(CardContext) as CardContextType;
  const [avatar, setAvatar] = useState<string>("");
  useEffect(() => {
    if (userId) {
      const user = members.find((member) => member._id === userId);
      if (user) {
        setAvatar(user?.image);
      }
    }
  }, [userId, members]);
  return (
    <div className="flex flex-row gap-3 items-start justify-start  py-1 w-30">
      <Avatar
        isBordered
        color="primary"
        className="w-[8%] "
        size="sm"
        src={avatar}
      />
      <div className="w-[92%] ">
        <p className="text-wrap ">{text}</p>
      </div>
    </div>
  );
};

export default Comment;
