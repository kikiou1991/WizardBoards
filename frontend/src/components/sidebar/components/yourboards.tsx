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
  } = useContext(BoardContext) as BoardContextType;
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null); // Maintain the ID of the selected board item

  const handleBoardChange = (boardId: string) => {
    setSelectedBoard(boardId);
    setIsBoardSelectedGlobal(true);
    setSelectedItemId(boardId); // Set the selected item ID
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
      });
      //
      //
      //
      //This section needs looking at, need to send the data we get to the backend with the changes(starred or name change)
      //
      //
      //

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
      <div className="flex flex-row px-2 pt-2">
        <h2 className="font-semibold flex-grow">Your Boards</h2>
        <MyModalNewBoard iconName="addIcon" />
      </div>
      <div className="pt-2 flex flex-col">
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
                      className="rounded"
                      src={board.imageLink}
                      width={26}
                      height={20}
                      alt="board-background"
                    />
                    <Link href="/workspace/projects" className="text-nowarp">
                      {board?.name?.length > 12
                        ? `${board.name.substring(0, 12)}...`
                        : board.name}
                    </Link>
                  </div>
                  <div className="ml-auto flex group/edit invisible group-hover/item:visible">
                    <Dropdown
                      className="bg-background text-[#E5EAF3]"
                      placement="bottom-start"
                      classNames={{
                        base: "before:bg-background",
                        content:
                          "py-1 px-1 border border-default-200 bg-background dark:from-default-50 dark:to-black",
                      }}
                    >
                      <DropdownTrigger>
                        <Button
                          className="bg-inherit hover:bg-secondaryBG"
                          size="sm"
                          isIconOnly
                        >
                          <Icon name="verticalDots" />
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu className="bg-background">
                        <DropdownSection className="align-center">
                          <DropdownItem className="data-[hover=true]:bg-secondaryBG text-center font-bold">
                            {board.name}
                          </DropdownItem>
                        </DropdownSection>
                        <DropdownSection>
                          <DropdownItem
                            key="delete"
                            endContent={<Icon name="bin" />}
                          >
                            <Button
                              className="bg-inherit hover:bg-transparent"
                              onPress={() => handleDelete(board.uuid)}
                            >
                              Delete Board by clicking the red button
                            </Button>
                          </DropdownItem>
                        </DropdownSection>
                        <DropdownSection>
                          <DropdownItem
                            key="Close board"
                            className="data-[hover=true]:bg-inherit flex flex-row text-center"
                          >
                            <Button
                              onPress={() => handleDelete(board.uuid)}
                              color="danger"
                              size="md"
                            >
                              Close Board
                            </Button>
                          </DropdownItem>
                        </DropdownSection>
                      </DropdownMenu>
                    </Dropdown>
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
