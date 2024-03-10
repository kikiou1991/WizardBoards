"use client";
import BoardNav from "@/components/board/boardnav";
import Lists from "@/components/lists/lists";
import {
  Button,
  Divider,
  Input,
  extendVariants,
  select,
} from "@nextui-org/react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext, UserContextType } from "@/contexts/Usercontext";
import Icon from "@/components/Icons";
import useOutsideClick from "@/components/customHooks/useOutsideClick";
import BoardView from "../boardview/page";
import { BoardContext, BoardContextType } from "@/contexts/BoardContext";
import { ListContext, ListContextType } from "@/contexts/ListContext";
import { CardContext, CardContextType } from "@/contexts/CardContext";

import {
  WorkspaceContext,
  WorkspaceContextType,
} from "@/contexts/WorkspaceContext";
import { boardLists } from "@/lib/v2/lists";
import { listCards } from "@/lib/v2/cards";
import CardDetails from "@/components/cardDetails";
import { Cards } from "@/types";

const Project = () => {
  const { token } = useContext(UserContext) as UserContextType;
  const { cards, cardDetails } = useContext(CardContext) as CardContextType;
  const { isBoardSelectedGlobal, selectedBoard, boards } = useContext(
    BoardContext
  ) as BoardContextType;
  const { lists, createList } = useContext(ListContext) as ListContextType;
  const { selectedWorkspace } = useContext(
    WorkspaceContext
  ) as WorkspaceContextType;
  const [isActive, setIsActive] = useState(true);
  const [listTitle, setListTitle] = useState("");
  const [isHidden, setIsHidden] = useState(false);

  const toggleCardDetails = () => {
    setIsHidden(!isHidden);
  };
  const board = boards.find((board) => board.uuid === selectedBoard);
  const ref = useRef<HTMLDivElement | null>(null);

  const handleDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    // Remove the "card-" prefix from draggableId and turn it into a number
    const cardUuid = parseInt(draggableId.replace("card-", ""));
    // Find the id of the starting list
    const startListId = source.droppableId;

    // Find the list that the card was dragged from
    const startList = lists.find((list) => list.uuid === startListId);

    // Find the id of the list that the card was dragged to
    const finishListId = destination.droppableId;
    // Find the list that the card was dragged to
    const finishList = lists.find((list) => list.uuid === finishListId);

    //filter the cards in the source list
    let filteredCards = cards.filter((card) => card.listUuid === startListId);

    //target the card object that we are dragging
    let removedCard = filteredCards.find((card) => card.cardIndex === cardUuid);
    //find the index of the card that we are dragging
    const removedCardIndex = filteredCards.findIndex(
      (card) => card.cardIndex === cardUuid
    );
    const targetCardIndex = filteredCards.findIndex(
      (card) => card.cardIndex === destination.index
    );
    if (targetCardIndex === removedCardIndex) return;
    const targetPos = filteredCards[targetCardIndex]?.position;

    // Handle item drag in same list or to another list
    if (startListId === finishListId) {
      //remove the card from the source list
      filteredCards.splice(removedCardIndex, 1);
      //insert the card at the target Index
      if (removedCard) {
        filteredCards.splice(targetCardIndex, 0, removedCard);
        // Update positions
        const updatedCards = filteredCards.map((card, index) => ({
          ...card,
          position: index + 1,
        }));

        listCards.createCard(token, updatedCards, updatedCards[0]?.listUuid);
      }
    } else {
      console.log("Dragged to another list");
      // Remove the card from the source list
      filteredCards.splice(removedCardIndex, 1);
      //find the the destination list
      const targetList = lists.find((list) => list.uuid === finishListId);
      console.log(targetList);
      //now find the target card within the target list
      const targetListCards = cards.filter(
        (card) => card.listUuid === targetList?.uuid
      );
      const targetCardIndex = targetListCards.findIndex(
        (card) => card.cardIndex === destination.index
      );
      const targetPos = targetListCards[targetCardIndex]?.position;
      //we need to update the list array  and the listUuid of the removed card to the target list uuid
      if (removedCard && targetList) {
        removedCard = {
          ...removedCard,
          listUuid: targetList?.uuid,
          list: [targetList?.uuid],
        };
      }
      //insert the card at the destination list
      if (removedCard) {
        targetListCards.splice(targetCardIndex, 0, removedCard);
        // Update positions
        const updatedCards = targetListCards.map((card, index) => ({
          ...card,
          position: index + 1,
        }));
        // listCards.createCard(token, updatedCards);
        console.log("removedCard after insertion: ", targetListCards);
      }
    }
  };
  const handleValueChange = (value: string) => {
    setListTitle(value);
  };

  const handleSubmitList = (token: any, listTitle: any) => {
    if (listTitle === "") {
      return;
    }
    try {
      createList(token, { title: listTitle }, selectedBoard);
      setListTitle("");
      toggleIsActive();
    } catch (error: any) {
      console.error("Error creating a new list: ", error.message);
    }
  };

  const toggleIsActive = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    setIsActive(false);
  }, []);

  //Custom hook to close the input field when clicking outside of it
  useOutsideClick(ref, toggleIsActive);

  return isBoardSelectedGlobal ? (
    <div className="relative grow  flex flex-col overflow-hidden ">
      <div className="relative w-full py-2 px-1 border-b-1 border-border items-center">
        <BoardNav />
      </div>
      <div className="relative">
        {/* track current card */}
        <CardDetails
          title={cardDetails?.title}
          isHidden={isHidden}
          setIsHidden={toggleCardDetails}
        />
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex w-full h-full overflow-x-auto items-start py-5 px-5 gap-5">
          {lists.map((list: any, key: any) => (
            <Lists
              showCardDetails={toggleCardDetails}
              key={list.uuid}
              name={list.title}
              id={list.uuid}
            />
          ))}
          {isActive ? (
            <div
              ref={ref}
              className="relative text-black w-48 rounded min-h-80 border-solid border-2 border-foreground bg-secondaryBG px-1 flex flex-col overflow-y-auto overflow-x-hidden"
              style={{
                minWidth: "272px",
                minHeight: "85px",
                maxHeight: "450px",
              }}
            >
              <Input
                value={listTitle}
                onValueChange={(newValue: string) =>
                  handleValueChange(newValue)
                }
                className="bg-blue text-black font-semibold pt-2 mb-2"
                placeholder="Enter a title for this list..."
                style={{
                  height: "40px",
                  padding: "5px",
                }}
                classNames={{
                  base: "max-w-full sm:max-w-[24rem] h-10 items-center border-slate-200",
                  mainWrapper: "flex h-full w-full justify-center  ",
                  input:
                    "text-small font-semibold group-data-[focus=true]:text-background",
                  inputWrapper:
                    "dark:focus-within:!bg-cards/70 data-[hover=true]:bg-cards h-full w-60  !cursor-text dark:focus-within:text-black bg-cards hover:bg-foreground border-slate-100 rounded-md",
                }}
              ></Input>
              <div className="flex justify-start items-center px-2 py-1">
                <Button
                  onClick={() => handleSubmitList(token, listTitle)}
                  color="primary"
                  className="hover:bg-primary/90 text-white font-semibold"
                >
                  Create List
                </Button>
                <Button
                  onClick={toggleIsActive}
                  className="bg-inherit hover:bg-slate-200 text-black font-semibold"
                  isIconOnly
                >
                  <Icon name="cancel" />
                </Button>
              </div>
            </div>
          ) : (
            <Button
              onClick={toggleIsActive}
              startContent={<Icon name="addIcon" />}
              style={{
                minWidth: "272px",
                minHeight: "45px",
                maxHeight: "450px",
              }}
              className="bg-transparent/20 flex justify-start"
            >
              <div>Create a new list...</div>
            </Button>
          )}
        </div>
      </DragDropContext>
    </div>
  ) : (
    <div>
      <BoardView />
    </div>
  );
};

export default Project;
