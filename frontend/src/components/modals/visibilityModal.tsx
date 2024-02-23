import { Button, Listbox, ListboxItem } from "@nextui-org/react";
import React, { useState } from "react";
import { ListboxWrapper } from "../listboxwrapper";

interface Props {
  toggle: () => void;
}

const VisibilityModal = ({ toggle }: Props) => {
  const [selectedKeys, setSelectedKeys] = useState("private" as string);

  const handleChange = () => {
    setSelectedKeys(selectedKeys === "private" ? "public" : "private");
  };
  console.log(selectedKeys);

  return (
    <div
      onClick={toggle}
      className="absolute z-10 bg-foreground text-background rounded-lg w-[280px] h-[230px]"
    >
      <div className="flex flex-col gap-3">
        <div className="items-center">
          <div>Select Workspace Visibility</div>
          <Button className="ml-auto" isIconOnly={true}>
            X
          </Button>
        </div>
        <ListboxWrapper>
          <Listbox
            aria-label="Single selectin"
            variant="flat"
            color="primary"
            disallowEmptySelection
            selectionMode="single"
            selectedKeys={selectedKeys}
            onSelectionChange={handleChange}
          >
            <ListboxItem key="private">Private</ListboxItem>
            <ListboxItem key="public">Public</ListboxItem>
          </Listbox>
        </ListboxWrapper>
      </div>
    </div>
  );
};

export default VisibilityModal;
