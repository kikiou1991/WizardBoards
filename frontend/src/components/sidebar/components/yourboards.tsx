"use client";
import Icon from "@/components/Icons";
import { UserContext, UserContextType } from "@/contexts/Usercontext";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Divider,
} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";
import MyModalNewBoard from "../sidebarmodal/new_board_modal";
import { BoardContext, BoardContextType } from "@/contexts/BoardContext";
import {
  WorkspaceContext,
  WorkspaceContextType,
} from "@/contexts/WorkspaceContext";
import NewBoardPopUp from "@/components/newboardpopup";
import PopUpWrapper from "@/components/CustomPopUp/Wrapper";
import PopUpBody from "@/components/CustomPopUp/Body";
import { useRouter } from "next/navigation";

const YourBoards = () => {
  const { token } = useContext(UserContext) as UserContextType;
  const context = useContext(UserContext);
  const { selectedWorkspace } = useContext(
    WorkspaceContext
  ) as WorkspaceContextType;
  const {
    boards,
    deleteBoard,
    setBoards,
    setSelectedBoard,
    setIsBoardSelectedGlobal,
    createBoard,
    setFavorites,
  } = useContext(BoardContext) as BoardContextType;
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null); // Maintain the ID of the selected board item
  const [isVisible, setIsVisible] = useState(true);
  const [isOpen, setIsOpen] = useState(true);
  const [popUpHeight, setPopUpHeight] = useState("100px");
  const [textVisible, setTextVisible] = useState(true);
  const router = useRouter();
  const handleBoardChange = (boardId: string) => {
    setSelectedBoard(boardId);
    setIsBoardSelectedGlobal(true);
    setSelectedItemId(boardId); // Set the selected item ID
    router.push(`/workspace/projects?board=${boardId}`);
  };
  const openDeleteMenu = () => {
    setPopUpHeight("350px");
    setTextVisible(false);
  };

  const handleVisible = () => {
    setIsVisible(!isVisible);
  };

  const handleDelete = async (boardUuid: string) => {
    try {
      await deleteBoard(context?.token, selectedWorkspace, boardUuid);
    } catch (error) {
      console.error("Error deleting board: ", error);
    }
  };
  //return a new board array where we sort them by the isStared property
  const orderBoardsByStar = [
    boards.sort((a: any, b: any) => {
      return a.isStared === b.isStared ? 0 : a.isStared ? -1 : 1;
    }),
  ];

  const handleStar = async (boardUuid: string) => {
    try {
      const selectedBoard = boards.find((board) => board.uuid === boardUuid);
      let res = await createBoard(token, {
        isStared: !selectedBoard?.isStared,
        name: selectedBoard?.name,
        workspaceUuid: selectedWorkspace,
        boardUuid: boardUuid,
      });
      if (selectedBoard) {
        setBoards((prevBoards) =>
          prevBoards.map((board) =>
            board.uuid === boardUuid
              ? { ...board, isStared: !selectedBoard.isStared }
              : board
          )
        );
      } else return;
    } catch (error) {}
  };

  return (
    <div>
      <Divider className="mt-2" />

      <div className="flex relative flex-row pl-2 hover:cursor-pointer items-center">
        <h2 className="font-semibold flex-grow">Your Boards</h2>

        <Button
          onPress={handleVisible}
          className="bg-inherit  ml-auto"
          isIconOnly
        >
          <Icon name="addIcon" />
        </Button>
        <NewBoardPopUp
          left={260}
          bottom={10}
          isVisible={isVisible}
          setVisi={handleVisible}
        />
      </div>
      <div className="pt-1 flex flex-col">
        {boards && boards.length > 0 ? (
          <ul className=" ">
            {orderBoardsByStar[0].map((board: any) => {
              return (
                <li
                  className={`px-2 group/item h-8 hover:bg-secondaryBG flex flex-row ${
                    selectedItemId === board.uuid
                      ? "bg-secondaryBG"
                      : "bg-background"
                  }`}
                  key={board.uuid || board.id}
                  onClick={() => handleBoardChange(board.uuid)}
                >
                  <div className="flex flex-row gap-2 items-center flex-nowrap">
                    <Image
                      className="rounded "
                      src={board.imageLink}
                      width={100}
                      height={100}
                      style={{ width: "40px", height: "28px" }}
                      alt="board-background"
                    />
                    <Link href="/workspace/projects" className="text-nowarp">
                      {board?.name?.length > 12
                        ? `${board.name.substring(0, 12)}...`
                        : board.name}
                    </Link>
                  </div>
                  <div className="ml-auto relative flex group/edit invisible group-hover/item:visible">
                    <Button
                      className="bg-inherit hover:bg-secondaryBG"
                      size="sm"
                      isIconOnly
                      onClick={() => setIsOpen(false)}
                    >
                      <Icon name="verticalDots" />
                    </Button>

                    <Button
                      onPress={(e) => handleStar(board.uuid)}
                      className={
                        board?.isStared
                          ? "bg-inherit visible group-hover/edit:transfrom transition-transform hover:scale-105 group-hover:bg-secondaryBG"
                          : "bg-inherit group-hover/edit:transfrom transition-transform hover:scale-125 group-hover:bg-secondaryBG"
                      }
                      size="sm"
                      isIconOnly
                    >
                      <Icon
                        name={board?.isStared ? "starYellow" : "star"}
                        classname={
                          board?.isStared ? "fill-warning" : "fill-current"
                        }
                      />
                    </Button>
                    <PopUpWrapper
                      classNames={`absolute ${
                        isOpen ? "hidden" : "block"
                      } bg-background top-4 left-10 items-center flex flex-col border-2 border-white z-20 w-[230px] h-[${popUpHeight}] `}
                    >
                      {" "}
                      <div className="flex flex-row w-full h-[50%] items-center justify-center pb-2">
                        <h2 className="px-2 text-center">
                          {textVisible ? board?.name : `Close ${board?.name}?`}
                        </h2>
                        <Button
                          className="bg-inherit ml-auto text-black hover:bg-white rounded-full"
                          isIconOnly
                          onClick={() => setIsOpen(!isOpen)}
                        >
                          X
                        </Button>
                      </div>
                      <PopUpBody classNames="flex items-center hover:cursor-pointer justify-center flex-row w-full h-[50%] px-2 ">
                        {textVisible ? (
                          <Button
                            className="w-full bg-inherit"
                            onClick={openDeleteMenu}
                          >
                            Close Board
                            <Icon name="bin" />
                          </Button>
                        ) : (
                          <div>
                            <p className="text-center py-2">
                              Once you close this board, you can't undo it!
                            </p>
                            <Button
                              className="w-full hover:text-red-500 bg-inherit"
                              onClick={() => handleDelete}
                            >
                              Close Board
                              <Icon name="bin" />
                            </Button>
                          </div>
                        )}
                      </PopUpBody>
                    </PopUpWrapper>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="pl-2">No boards to show yet!</p>
        )}
      </div>
    </div>
  );
};

export default YourBoards;
