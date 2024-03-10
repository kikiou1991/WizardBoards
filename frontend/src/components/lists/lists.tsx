"use client";
import React, {
  useContext,
  useState,
  useRef,
  KeyboardEvent,
  useEffect,
} from "react";
import Cards from "../card/card";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { UserContext, UserContextType } from "@/contexts/Usercontext";
import { Button, Input } from "@nextui-org/react";
import Icon from "../Icons";
import useOutsideClick from "../customHooks/useOutsideClick";
import { CardContext, CardContextType } from "@/contexts/CardContext";
import CardDetails from "../cardDetails";

interface Props {
  name: string;
  id: string;
  showCardDetails: () => void;
}

const Lists = ({ name, id, showCardDetails }: Props) => {
  const { token } = useContext(UserContext) as UserContextType;
  const { cards, createCard, setCardDetails } = useContext(
    CardContext
  ) as CardContextType;
  const [inputFieldRendered, setInputFieldRendered] = useState(false);
  const [cardTitle, setCardTitle] = useState("");
  const [newCardAdded, setNewCardAdded] = useState(false);

  const ref = useRef(null);
  const listRef = useRef<HTMLDivElement>(null);

  const toggleInput = () => {
    setInputFieldRendered(!inputFieldRendered);
    if (!inputFieldRendered && listRef.current) {
      // Scroll to the bottom when input field is toggled
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  };

  const handleValueChange = (value: string) => {
    setCardTitle(value);
  };

  const handleSubmitCard = (token: any, cardTitle: string) => {
    if (cardTitle === "") {
      // Handle empty title
      return;
    }

    try {
      createCard(token, { title: cardTitle }, id);
      setCardTitle("");
      setNewCardAdded(true);
      toggleInput(); // Close the input field after submitting
    } catch (error) {
      console.error("Failed to submit card", error);
      // Handle error if needed
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSubmitCard(token, cardTitle);
      setInputFieldRendered(true);
    }
  };
  const filteredCards = cards?.filter((card) => card.listUuid === id);

  useEffect(() => {
    if (listRef.current) {
      // Scroll to the bottom when a new card is added
      listRef.current.scrollTop = listRef.current.scrollHeight;
      setNewCardAdded(false);
    }
  }, [newCardAdded, inputFieldRendered]); // Trigger effect when cards change

  useOutsideClick(ref, toggleInput);

  // Filter cards based on the current list ID
  return (
    <div
      className="relative text-foreground w-48 rounded-lg min-h-80  border-2 border-border bg-background px-2  flex flex-col overflow-y-hidden overflow-x-hidden"
      style={{ minWidth: "272px", minHeight: "120px", maxHeight: "450px" }}
    >
      <div
        className="sticky w-48 top-0 left-0 bg-inherit items-center justify-center py-2 px-2 "
        style={{ width: "260px", height: "40px" }}
      >
        {name}
      </div>
      <div ref={listRef} className="overflow-y-hidden py-1">
        <Droppable droppableId={id} direction="vertical">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="flex flex-col items-center h-full  px-1"
            >
              {filteredCards
                ?.slice()
                ?.sort((a, b) => a.position - b.position)
                ?.map((card: any) => (
                  <Cards
                    key={card.uuid}
                    name={card.title}
                    position={card.position}
                    index={card.cardIndex}
                    showCardDetails={() => {
                      setCardDetails(card), showCardDetails();
                    }}
                  />
                ))}
              {inputFieldRendered && (
                <Input
                  ref={ref}
                  value={cardTitle}
                  onValueChange={(newValue: string) =>
                    handleValueChange(newValue)
                  }
                  className="bg-blue text-black mt-2 font-semibold"
                  placeholder="Enter a title for this card..."
                  style={{
                    height: "40px",
                    padding: "5px",
                  }}
                  onKeyDown={handleKeyDown}
                  classNames={{
                    base: "text-black max-w-full sm:max-w-[24rem] h-10 items-center border-slate-200",
                    mainWrapper: "flex h-full w-full  justify-center  ",
                    input:
                      "text-small font-semibold group-data-[focus=true]:text-background",
                    inputWrapper:
                      "dark:focus-within:!bg-cards/60 data-[hover=true]:bg-cards h-full w-60  !cursor-text dark:focus-within:text-forground bg-cards hover:bg-foreground border-slate-100 rounded-md",
                  }}
                />
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
      <div className="sticky bottom-0 left-0  bg-inherit w-64 m-auto pb-2 ">
        {inputFieldRendered ? (
          <div className="flex justify-start items-center px-2 py-1">
            <Button
              onClick={() => handleSubmitCard(token, cardTitle)}
              color="primary"
              className="hover:bg-primary/90 text-white font-semibold"
            >
              Add Card
            </Button>
            <Button
              onClick={toggleInput}
              className="bg-inherit hover:bg-slate-200 text-black font-semibold"
              isIconOnly
            >
              <Icon name="cancel" />
            </Button>
          </div>
        ) : (
          <div className="flex justify-start items-center mt-2">
            <Button
              color="default"
              onClick={toggleInput}
              startContent={<Icon name="addIcon" />}
              className=" font-semibold"
            >
              Add Card
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Lists;
