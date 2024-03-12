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
import { start } from "repl";

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

  const toggleCardDetails = () => {
    setIsHidden(!isHidden);
  };
  const board = boards.find((board) => board.uuid === selectedBoard);
  const ref = useRef<HTMLDivElement | null>(null);

  const reOrder = (list: any, startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const handleDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    console.log("dragged item: ", draggableId);
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
          console.log("updatedList", updatedList);
          // Create a new array with the updated source list
          const updatedLists = [...prevLists];
          console.log("updatedLists", updatedLists);
          // updatedLists[updatedListIndex] = updatedList;
          return updatedLists;
        });
        console.log("lists", lists);
        // listCards.createCard(token, updatedCards, updatedCards[0]?.listUuid);
      }
      console.log("lists after block", lists);
    } else {
      console.log("Dragged to another list");
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
          // Create a new array with the updated source and destination lists
          const updatedLists = [...prevLists];
          console.log("updatedLists", updatedLists);
          updatedLists[updatedSourceListIndex] = updatedSourceList;
          updatedLists[updatedDestListIndex] = updatedDestList;

          //might need a different approach, the same way we updated multiple cards with one api call we want to do the same with lists
          //so we would use upDateMany on the backend and send back the updated list

          return updatedLists;
        });
      }
    }
    console.log("lists", lists);
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
