"use client";
import { Button, Input, Textarea, card } from "@nextui-org/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import useOutsideClick from "../customHooks/useOutsideClick";
import { CardContext, CardContextType } from "@/contexts/CardContext";
import { listCards } from "@/lib/v2/cards";
import { UserContext, UserContextType } from "@/contexts/Usercontext";
import { io, Socket } from "socket.io-client";
import projectConfig from "../projectConfig";

interface TextAreaProps {
  value?: string;
  desc?: string;
  onSubmit?: (value: string) => void;
}

const TextArea = ({ value, desc, onSubmit }: TextAreaProps) => {
  const { cardDetails, setCardDetails } = useContext(
    CardContext
  ) as CardContextType;

  const [editValue, setEditValue] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const textAreaRef = useRef(null);
  const [isSubmitted, setIsSubmitted] = useState(true);
  const { token } = useContext(UserContext) as UserContextType;

  useOutsideClick(textAreaRef, () => {
    if (!isEditing && editValue.length <= 6) {
      setIsSubmitted(false);
    } else {
      setIsSubmitted(true);
      if (onSubmit) onSubmit(editValue);
    }
  });

  const cardUuid = cardDetails?.uuid;
  let message = cardDetails?.description;

  const handleSubmit = () => {
    setIsActive(false);
    setIsSubmitted(true);
    if (onSubmit) onSubmit(editValue);
    listCards.addDescription(token, cardUuid, editValue);
  };
  const socketRef = useRef<Socket | null>(null);
  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io(
        `${projectConfig.apiBaseUrl}/v2/cards/description`,
        {}
      );
    }

    const socket = socketRef.current;

    socket.on("desc", (data: any) => {
      if (data.type === "update") {
        setCardDetails(data.data);
      }
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []);
  return (
    <div className="ml-6">
      {isSubmitted ? (
        <div
          onDoubleClick={() => {
            setIsActive(true);
            setIsSubmitted(false);
          }}
          onClick={() => setIsActive(true)}
        >
          <p>{message}</p>
        </div>
      ) : isActive ? (
        <div
          ref={textAreaRef}
          className="flex flex-col items-start justify-center gap-1"
        >
          <textarea
            value={editValue === "" ? message : editValue}
            style={{ resize: "none" }}
            onChange={(e) => setEditValue(e.target.value)}
            className="w-full h-28 p-2 border-2 border-gray-300 rounded-md hover:bg-white bg-foreground text-background focus:outline-none focus:border-blue-500"
          />
          <Button
            color="primary"
            onPressEnd={() => {
              setIsActive(false);
              handleSubmit();
            }}
          >
            Save
          </Button>
        </div>
      ) : (
        <Input
          placeholder="Add a more description..."
          className="w-full"
          type="text"
          classNames={{
            base: "max-w-full sm:max-w-[28rem] h-10 bg-foreground",
            mainWrapper: "flex h-full w-full  bg-forground",
            input:
              "text-small font-semibold group-data-[focus=true]:text-background",
            inputWrapper:
              "dark:focus-within:!bg-foreground/70 data-[hover=true]:bg-foregound/80 h-full w-60  !cursor-text dark:focus-within:text-black bg-white hover:bg-foreground border-slate-100 rounded-md",
          }}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onClick={() => setIsActive(true)}
        ></Input>
      )}
    </div>
  );
};

export default TextArea;
