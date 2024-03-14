"use client";
import { Button, Input, Textarea } from "@nextui-org/react";
import React, { useRef, useState } from "react";
import useOutsideClick from "../customHooks/useOutsideClick";

interface TextAreaProps {
  value?: string;
}

const TextArea = ({ value }: TextAreaProps) => {
  const [editValue, setEditValue] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const textAreaRef = useRef(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useOutsideClick(textAreaRef, () => {
    if (editValue.length <= 6) setIsSubmitted(false);
    else setIsSubmitted(true);
  });

  //   const validate = (value: string) => {
  //     if (value.length <= 6) {
  //       return "Please enter a description longer than 6 characters";
  //     }
  //     return undefined;
  //   };
  const handleSubmit = () => {
    setIsActive(false);
    // Handle your submission logic here
    if (editValue.length <= 6) {
      setIsSubmitted(false);
    } else setIsSubmitted(true);
  };

  return (
    <div>
      {isSubmitted ? (
        <div
          onDoubleClick={() => {
            setIsActive(true);
            setIsSubmitted(false);
          }}
          onClick={() => setIsActive(true)}
        >
          <p>{editValue}</p> {/* Transform value into a paragraph */}
        </div>
      ) : isActive ? (
        <div
          ref={textAreaRef}
          className="flex flex-col items-start justify-center gap-1"
        >
          <textarea
            value={editValue}
            style={{ resize: "none" }}
            onChange={(e) => setEditValue(e.target.value)}
            className="w-full h-28 p-2 border-2 border-gray-300 rounded-md  bg-foreground focus:outline-none focus:border-blue-500"
          />
          <Button
            color="primary"
            onClick={() => {
              setIsActive(false);
              handleSubmit();
            }}
          >
            Save
          </Button>
        </div>
      ) : (
        <Input
          placeholder="Add a description..."
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
