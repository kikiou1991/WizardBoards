import { Button, Listbox, ListboxItem } from "@nextui-org/react";
import React, { useState } from "react";
import { ListboxWrapper } from "../listboxwrapper";
import Icon from "../Icons";

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
        <div className="items-center flex sm:flex-col flex-row px-2 pt-2 pb-3">
          <div>Select Workspace Visibility</div>
          <Button
            className="ml-auto bg-inherit text-background p-0"
            isIconOnly={true}
          >
            X
          </Button>
        </div>
        <ListboxWrapper>
          <Listbox
            aria-label="Single selectin"
            variant="flat"
            color="default"
            disallowEmptySelection
            selectionMode="single"
            selectedKeys={selectedKeys}
            onSelectionChange={handleChange}
          >
            <ListboxItem key="private">
              <div className="flex flex-col">
                <div className="flex flex-row gap-1 items-center">
                  <Icon name="privateSymbol" />
                  <p>Private</p>
                </div>
                <p>
                  This workspace is private. It is not visible to anyone outside
                  this workspace.
                </p>
              </div>
            </ListboxItem>
            <ListboxItem key="public">
              <div className="flex flex-col">
                <div className="flex flex-row gap-1 items-center">
                  <Icon name="publicSymbol" />
                  <p>Private</p>
                </div>
                <p>This workspace is public It`s visible to anyone.</p>
              </div>
            </ListboxItem>
          </Listbox>
        </ListboxWrapper>
      </div>
    </div>
  );
};

export default VisibilityModal;
