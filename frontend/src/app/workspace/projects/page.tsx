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
import { workspaceBoards } from "@/lib/v2/boards";
import {
  WorkspaceContext,
  WorkspaceContextType,
} from "@/contexts/WorkspaceContext";
import { boardLists } from "@/lib/v2/lists";
import { listCards } from "@/lib/v2/cards";

const Project = () => {
  const { token } = useContext(UserContext) as UserContextType;
  const { cards } = useContext(CardContext) as CardContextType;
  const { isBoardSelectedGlobal, selectedBoard } = useContext(
    BoardContext
  ) as BoardContextType;
  const { lists, createList } = useContext(ListContext) as ListContextType;
  const { selectedWorkspace } = useContext(
    WorkspaceContext
  ) as WorkspaceContextType;
  const [isActive, setIsActive] = useState(true);
  const [listTitle, setListTitle] = useState("");

  const ref = useRef<HTMLDivElement | null>(null);

  const handleDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
    console.log(result);
    if (!destination) return;

    // Remove the "card-" prefix from draggableId and turn it into a number
    const cardUuid = parseInt(draggableId.replace("card-", ""));

    // Find the id of the starting list
    const startListId = source.droppableId;

    // create new array of cards from the lists

    // Find the list that the card was dragged from
    const startList = lists.find((list) => list.uuid === startListId);
    // Find the id of the list that the card was dragged to
    const finishListId = destination.droppableId;

    // Find the list that the card was dragged to
    const finishList = lists.find((list) => list.uuid === finishListId);
    //filter the cards in the source list
    const filteredCards = cards.filter((card) => card.listUuid === startListId);

    //target the card object that we are dragging
    const removedCard = filteredCards.find(
      (card) => card.cardIndex === cardUuid
    );

    // Handle item drag in same list or to another list
    if (startListId === finishListId) {
      console.log("Dragged within the same list");
      //find the list we are dragging inside of
      const currentList = lists.find((list) => list.uuid === finishListId);
      console.log("current list: ", currentList);
      const removedCardIndex = filteredCards.findIndex(
        (card) => card.cardIndex === cardUuid
      );
      // Remove the card from the list
      const removedCard = filteredCards.splice(removedCardIndex, 1)[0];
      let originalPosition = removedCard.position;
      // Find where the card was dropped
      const newCardIndex = destination.index;

      // Find the index of the destination card
      const destinationCardIndex = filteredCards.findIndex(
        (card) => card.cardIndex === newCardIndex
      );
      // Find the position of the destination card
      let destinationCardPos = filteredCards[destinationCardIndex].position;
      // Update the position of the removed card
      let destinationCard = filteredCards[destinationCardIndex];
      // Insert the removed card at the index of the destination card
      filteredCards.splice(destinationCardIndex, 0, removedCard);
      console.log(
        "we inserted the card at the destination index: ",
        filteredCards
      );
      //next we update the position of the removed card
      let newCardPos = 0;
      console.log("destination card position before: ", destinationCardPos);
      if (removedCard) {
        removedCard.position = destinationCardPos;
        newCardPos = removedCard.position;
        destinationCard.position++;
        if (currentList?.cards?.length < destinationCard.position) {
          destinationCard.position--;
        }
      }
      console.log("new card position: ", newCardPos);
      console.log("original card position: ", originalPosition);
      console.log("destination cards new position: ", destinationCard.position);
      filteredCards.forEach((card) => {});
    } else {
      console.log("Dragged to another list");
      // Remove the card from the source list
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
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex w-full h-full overflow-x-auto items-start py-5 px-5 gap-5">
          {lists.map((list: any, key: any) => (
            <Lists key={list.uuid} name={list.title} id={list.uuid} />
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
