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
  position: number;
  showCardDetails?: () => void;
}

const Cards = ({ name, index, showCardDetails }: Props) => {
  const { token } = useContext(UserContext) as UserContextType;

  const [isHovered, setIsHovered] = React.useState(false);

  const onMouseOver = () => setIsHovered(true);
  const onMouseLeave = () => setIsHovered(false);

  return (
    <Draggable draggableId={`${index}`} index={index} key={index}>
      {(provided) => (
        <div
          className="w-60 rounded-md border-solid mt-2 border-2 py-2 hover:border-blue-500  hover:border-2 shadow-sm border-border bg-cards px-2  items-center overflow-x-hidden text-wrap flex relative"
          style={{
            minWidth: "242px",
            minHeight: "80px",
            ...provided.draggableProps.style,
          }}
          onClick={showCardDetails}
          {...provided.draggableProps}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
        >
          <div style={{ marginRight: "24px" }}>
            {name?.length > 35 ? name?.slice(0, 45) + "..." : name}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Cards;
