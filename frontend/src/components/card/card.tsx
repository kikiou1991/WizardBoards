import React, { useContext } from "react";
import { Draggable } from "@hello-pangea/dnd";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import Icon from "../Icons";
import { UserContext, UserContextType } from "@/contexts/Usercontext";
import { CardContext, CardContextType } from "@/contexts/CardContext";

interface Props {
  name: string;
  index: number;
}

const Cards = ({ name, index }: Props) => {
  const { token } = useContext(UserContext) as UserContextType;
  const { cards, deleteCard } = useContext(CardContext) as CardContextType;

  const [isHovered, setIsHovered] = React.useState(false);

  const handleDeleteCard = async () => {
    try {
      const cardToDelete = cards.find((card) => card.cardIndex === index);
      if (cardToDelete) {
        const { uuid, listUuid } = cardToDelete;

        await deleteCard(token, uuid, listUuid);
      }
    } catch (error) {
      console.error("Failed to delete card:", error);
    }
  };
  const onMouseOver = () => setIsHovered(true);
  const onMouseLeave = () => setIsHovered(false);

  return (
    <Draggable draggableId={`card-${index}`} index={index}>
      {(provided) => (
        <div
          className="w-60 rounded-md border-solid border-2 border-border bg-cards px-2 py-2 items-center overflow-x-hidden text-wrap flex relative"
          style={{ minWidth: "242px", minHeight: "80px" }}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div style={{ marginRight: "24px" }}>{name}</div>
          <Popover
            className=""
            showArrow
            backdrop="opaque"
            placement="right"
            classNames={{
              base: [
                // arrow color
                "before:bg-cards",
              ],
              content: [
                "py-3 px-4 border border-slate-300",
                "bg-cards",
                "dark:from-default-100 dark:to-default-50",
              ],
            }}
          >
            <PopoverTrigger
              className={`absolute right-0 top-0 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            >
              <Button
                size="sm"
                endContent={<Icon name="edit" />}
                isIconOnly
                className="bg-inherit hover:bg-[#dadada] rounded-full"
              ></Button>
            </PopoverTrigger>
            <PopoverContent className="">
              {(titleProps) => (
                <div className="items-center">
                  <div className="bg-cards items-center rounded-lg hover:bg-slate-300">
                    <Button
                      startContent={<Icon name="editCard" />}
                      className="text-black font-bold bg-inherit"
                    >
                      Edit Card
                    </Button>
                  </div>
                  <div className="bg-cards items-center rounded-lg hover:bg-slate-300">
                    <Button
                      onPress={() => {
                        handleDeleteCard();
                      }}
                      startContent={<Icon name="archive" />}
                      className="text-black font-bold bg-inherit"
                    >
                      Delete Card
                    </Button>
                  </div>
                </div>
              )}
            </PopoverContent>
          </Popover>
        </div>
      )}
    </Draggable>
  );
};

export default Cards;
