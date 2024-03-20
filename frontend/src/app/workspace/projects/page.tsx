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
import { KeyboardEvent, useContext, useEffect, useRef, useState } from "react";
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
import { start } from "repl";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

const Project = () => {
  const { token } = useContext(UserContext) as UserContextType;
  const { cards, cardDetails, setCards } = useContext(
    CardContext
  ) as CardContextType;
  const { isBoardSelectedGlobal, selectedBoard, boards } = useContext(
    BoardContext
  ) as BoardContextType;
  const { lists, createList, setLists } = useContext(
    ListContext
  ) as ListContextType;
  const { selectedWorkspace } = useContext(
    WorkspaceContext
  ) as WorkspaceContextType;
  const [isActive, setIsActive] = useState(true);
  const [listTitle, setListTitle] = useState("");
  const [isHidden, setIsHidden] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const searchParams = useSearchParams();

  if (listTitle.length > 50) {
    toast.error("List title must be less than 50 characters");
  }
  const board = boards.find((board) => board.uuid === selectedBoard);

  const reOrder = (list: any, startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };
  const toggleCardDetails = () => {
    setIsHidden(!isHidden);
  };
  const handleDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    const cardUuid = parseInt(draggableId);

    const startListId = source.droppableId;
    const finishListId = destination.droppableId;

    const startList = lists.find((list) => list.uuid === startListId);
    const finishList = lists.find((list) => list.uuid === finishListId);

    //filter the cards in the source list
    let sourceCards = cards.filter((card) => card.listUuid === startListId);

    //target the card object that we are dragging
    let removedCard = sourceCards.find((card) => card.cardIndex === cardUuid);
    //find the index of the card that we are dragging
    const removedCardIndex = sourceCards.findIndex(
      (card) => card.cardIndex === cardUuid
    );
    const targetCardIndex = sourceCards.findIndex(
      (card) => card.cardIndex === destination.index
    );
    if (targetCardIndex === removedCardIndex) return;

    // Handle item drag in same list or to another list
    if (startListId === finishListId) {
      //remove the card from the source list
      sourceCards.splice(removedCardIndex, 1);
      //insert the card at the target Index
      if (removedCard) {
        sourceCards.splice(targetCardIndex, 0, removedCard);
        // Update positions
        const updatedCards = sourceCards.map((card, index) => ({
          ...card,
          position: index + 1,
        }));
        setLists((prevLists) => {
          // Find the source list
          const updatedListIndex = prevLists.findIndex(
            (list) => list.uuid === startListId
          );
          // Update the source list
          const updatedList = {
            ...prevLists[updatedListIndex],
            cards: updatedCards,
          };
          // Create a new array with the updated source list
          const updatedLists = [...prevLists];
          // updatedLists[updatedListIndex] = updatedList;
          return updatedLists;
        });
        listCards.createCard(token, updatedCards, updatedCards[0]?.listUuid);
      }
    } else {
      // Remove the card from the source list
      sourceCards.splice(removedCardIndex, 1);
      //find the the destination list
      const targetList = lists.find((list) => list.uuid === finishListId);
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
        const updatedSourceCards = sourceCards.map((card, index) => ({
          ...card,
          position: index + 1,
        }));
        //update the card in the db
        setLists((prevLists) => {
          // Find the source list
          const updatedSourceListIndex = prevLists.findIndex(
            (list) => list.uuid === startListId
          );
          // Find the destination list
          const updatedDestListIndex = prevLists.findIndex(
            (list) => list.uuid === finishListId
          );
          // Update the source list
          const updatedSourceList = {
            ...prevLists[updatedSourceListIndex],
            cards: updatedSourceCards,
          };
          // Update the destination list
          const updatedDestList = {
            ...prevLists[updatedDestListIndex],
            cards: updatedCards,
          };
          //fint the card that was dragged to the new list
          const movedCard = updatedDestList.cards.find(
            (card) => card.cardIndex === removedCard?.cardIndex
          );

          // Create a new array with the updated source and destination lists
          const updatedLists = [...prevLists];
          updatedLists[updatedSourceListIndex] = updatedSourceList;
          //we need to transfrom the cards array of objects to be only strings of each of their _id
          const sourceCardIds = updatedSourceList.cards.map((card) => card._id);
          const newSourceCards = {
            ...updatedSourceList,
            cards: sourceCardIds,
          };
          boardLists.createList(token, newSourceCards, selectedBoard);
          updatedLists[updatedDestListIndex] = updatedDestList;
          //update the card in the db
          //wait for the card to be updated in the db
          if (movedCard)
            listCards.createCard(token, movedCard, movedCard?.listUuid);
          //update the source list after the card is updated in the db

          return updatedLists;
        });
      }
    }
    return lists;
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

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSubmitList(token, listTitle);
    }
  };

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
          uuid={cardDetails?.uuid}
        />
      </div>
      <div className="flex w-full h-full overflow-x-auto items-start py-5 px-5 gap-5">
        <DragDropContext onDragEnd={handleDragEnd}>
          {lists.map((list: any, key: any) => (
            <Lists
              showCardDetails={toggleCardDetails}
              key={list.uuid}
              name={list.title}
              cards={list.cards}
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
                maxLength={50}
                onValueChange={(newValue: string) =>
                  handleValueChange(newValue)
                }
                onKeyDown={handleKeyDown}
                className="bg-blue text-black font-semibold p-2 "
                placeholder="Enter a title for this list..."
                classNames={{
                  label: "text-black/50 dark:text-white/90",
                  input: [
                    "bg-transparent",
                    "text-black/90 dark:text-white/90",
                    "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                  ],
                  innerWrapper: "bg-transparent",
                  inputWrapper: [
                    "shadow-xl",
                    "bg-default-200/50",
                    "dark:bg-default/60",
                    "backdrop-blur-xl",
                    "hover:bg-default-200/70",
                    "dark:hover:bg-default/70",
                    "group-data-[focused=true]:bg-default-200/50",
                    "dark:group-data-[focused=true]:bg-default/60",
                    "!cursor-text",
                  ],
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
        </DragDropContext>
      </div>
    </div>
  ) : (
    <div>
      <BoardView />
    </div>
  );
};

export default Project;
