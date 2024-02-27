import { Button, Listbox, ListboxItem } from "@nextui-org/react";
import React, { useEffect, useRef, useState } from "react";
import { ListboxWrapper } from "../listboxwrapper";
import Icon from "../Icons";

interface Props {
  toggleModal: () => void;
}
const VisibilityModal = ({ toggleModal }: Props) => {
  const [selectedKeys, setSelectedKeys] = useState("private" as string);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const button = document.getElementById("changeButton");
    const modal = ref.current;

    if (button && modal) {
      const buttonRect = button.getBoundingClientRect();
      modal.style.position = "absolute";
      modal.style.top = `${buttonRect.bottom}px`; // Position modal below the button
      modal.style.left = `${buttonRect.left - 250}px`; // Position modal more towards the left corner
    }
  }, []);

  const handleChange = () => {
    setSelectedKeys(selectedKeys === "private" ? "public" : "private");
  };

  return (
    <div
      style={{ top: modalPosition.top, left: modalPosition.left }}
      className="absolute z-10 bg-foreground text-background rounded-lg w-[280px] h-[230px]"
      ref={ref}
    >
      <div className="flex flex-col">
        <div className="items-center flex flex-row px-2 pt-2 pb-3">
          <div>Select Workspace Visibility</div>
          <Button
            className="bg-inherit text-background p-0 ml-auto"
            isIconOnly={true}
            onClick={toggleModal}
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
            <ListboxItem key="private" textValue="public">
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
            <ListboxItem key="public" textValue="private">
              <div className="flex flex-col">
                <div className="flex flex-row gap-1 items-center">
                  <Icon name="publicSymbol" />
                  <p>Private</p>
                </div>
                <p className="text-sm">
                  This workspace is public It`s visible to anyone.
                </p>
              </div>
            </ListboxItem>
          </Listbox>
        </ListboxWrapper>
      </div>
    </div>
  );
};

export default VisibilityModal;
