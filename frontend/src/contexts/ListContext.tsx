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
import { Workspace, Boards, Lists, Cards } from "@/types";

// Interfaces Section

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
  const { boards, setBoards, selectedBoard } = useContext(
    BoardContext
  ) as BoardContextType;
  const [lists, setLists] = useState<Lists[]>([]);

  //we are going to need to fetch the lists
  const fetchLists = async (token: any, boardUuid: string) => {
    if (!boardUuid) return;
    try {
      const res = await boardLists.getLists(token, boardUuid);
      setLists(res?.newList?.data || []);
    } catch (error: any) {
      console.error("Failed to fetch lists", error);
    }
  };

  //we are going to need to create the lists

  const createList = async (token: any, listData: any, boardUuid: string) => {
    try {
      const res = await boardLists.createList(token, listData, boardUuid);
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
        fetchLists(token, selectedBoard);
      }
    }
  }, [boards, selectedBoard]);

  useEffect(() => {
    let socket = io("http://localhost:3002/api/v2/lists", {});
    socket.on("list", (data) => {
      if (data.type === "create") {
        console.log("running the socket to create a list");
        const newList = data.data;
        setLists((prevLists) => {
          return [...prevLists, newList];
        });
      } else {
        throw new Error("Failed to create list with socket");
      }
    });
    return () => {
      console.log("cleaning up the socket");
      socket.disconnect(); //clean up the socket
    };
  }, []);
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
