"use client";
import { UserContext, UserContextType } from "@/contexts/Usercontext";
import { workspaceBoards } from "@/lib/v2/boards";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { io } from "socket.io-client";
import { BoardContext, BoardContextType } from "./BoardContext";
import { boardLists } from "@/lib/v2/lists";

// Interfaces Section
interface Workspace {
  _id: string;
  name: string;
  uuid: string;
}
interface Boards {
  _id: string;
  name: string;
  uuid: string;
  isStared: boolean;
  workspace: Workspace;
  lists: Lists[];
}

interface Lists {
  _id: string;
  name: string;
  uuid: string;
  boardId: string;
  cards: Cards[];
}

interface Cards {
  _id: string;
  title: string;
  uuid: string;
  cardIndex: number;
  listUuid: string;
}
export interface ListContextType {
  lists: Lists[];
  setLists: React.Dispatch<React.SetStateAction<Lists[]>>;
  getLists: (token: any, boardUuid: string, data: any) => Promise<void>;
  createList: (token: any, listData: any, boardUuid: string) => Promise<void>;
  deleteList: (token: any, boardUuid: string, listData: any) => Promise<void>;
}
interface WorkspaceContextProviderProps {
  children: ReactNode;
}
//call the useContext
const ListContext = createContext<ListContextType | null>(null);

const ListContextProvider = ({ children }: WorkspaceContextProviderProps) => {
  const { token } = useContext(UserContext) as UserContextType;
  //we gonna need boards from boardContext
  const { boards, setBoards } = useContext(BoardContext) as BoardContextType;
  const [selectedBoard, setSelectedBoard] = useState("");
  const [lists, setLists] = useState<Lists[]>([]);

  useEffect(() => {
    let socket = io("http://localhost:3002/api/v2/lists", {});
    socket.on("list", (data) => {});
  }, []);

  //we are going to need to fetch the lists
  const fetchLists = async (token: any, boardUuid: string, data: any) => {
    try {
      const res = await boardLists.getLists(token, boardUuid);
      setLists(res?.newList || []);
    } catch (error: any) {
      console.error("Failed to fetch lists", error);
    }
  };

  //we are going to need to create the lists

  const createList = async (token: any, listData: any, boardUuid: string) => {
    try {
      const title = listData;
      const res = await boardLists.createList(token, title, boardUuid);
      if (res && res.newList) {
        setLists([res.newList, ...lists]);
      }
    } catch (error: any) {
      console.error("Failed to create list", error);
    }
  };
  //we are going to need to delete the lists

  const deleteList = async (token: any, boardUuid: string, listData: any) => {
    try {
      const response = await boardLists.deleteList(token, boardUuid, listData);
      if (response?.status === true) {
        setLists(lists.filter((list) => listData._id !== list.uuid));
      }
    } catch (error) {
      console.error("Error deleting the list", error);
    }
  };
  useEffect(() => {
    if (token && boards.length > 0) {
      for (let board of boards) {
        fetchLists(token, board.uuid, {});
      }
    }
  }, [boards]);

  //fetch cards for each lists on render or if the lists change
  //  useEffect(() => {
  //   if (localStorage['token'] && lists.length > 0) {
  //     for (let list of lists) {
  //       fetchCards(localStorage['token'], list.uuid);
  //     }
  //   }
  // }, [lists]);

  const contextValue: ListContextType = {
    lists,
    setLists,
    getLists: fetchLists,
    createList,
    deleteList,
  };
  return (
    <ListContext.Provider value={contextValue}>{children}</ListContext.Provider>
  );
};

export { ListContext, ListContextProvider };
