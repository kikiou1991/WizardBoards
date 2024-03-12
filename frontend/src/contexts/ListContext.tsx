"use client";
import { UserContext, UserContextType } from "@/contexts/Usercontext";
import { workspaceBoards } from "@/lib/v2/boards";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";
import { BoardContext, BoardContextType } from "./BoardContext";
import { boardLists } from "@/lib/v2/lists";
import { Workspace, Boards, Lists, Cards } from "@/types";
import projectConfig from "@/components/projectConfig";

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
    console.log("listData", listData);
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
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io(`${projectConfig.apiBaseUrl}/v2/lists`, {});
    }
    console.log("is this working?");
    const socket = socketRef.current;

    socket.on("list", (data: any) => {
      if (data.type === "create") {
        console.log("running the socket to create a list");
        const newList = data.data;
        if (!lists.some((list) => list.uuid === newList.uuid)) {
          setLists((prevLists) => {
            console.log("prevLists", prevLists);
            return [...prevLists, newList];
            // return [...prevLists, newList];
          });
        }
      } else if (data.type === "update") {
        console.log("running the socket to update a list");
        const updatedList = data.data;
        console.log("updatedList", updatedList);
        setLists((prevLists) => {
          return prevLists?.map((list) => {
            if (list.uuid === updatedList?.uuid) {
              return updatedList;
            }
            return list;
          });
        });
      } else {
        throw new Error("Failed to create list with socket");
      }
    });
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
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
