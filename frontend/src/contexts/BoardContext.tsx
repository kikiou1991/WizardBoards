"use client";
import projectConfig from "@/components/projectConfig";
import { UserContext, UserContextType } from "@/contexts/Usercontext";
import { workspaceBoards } from "@/lib/v2/boards";
import { Boards, Workspace } from "@/types";
import { useSearchParams } from "next/navigation";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Socket, io } from "socket.io-client";
import { WorkspaceContext, WorkspaceContextType } from "./WorkspaceContext";
import toast from "react-hot-toast";

export interface BoardContextType {
  boards: Boards[];
  favorites: Boards[];
  setFavorites: React.Dispatch<React.SetStateAction<Boards[]>>;

  selectedBoard: string;
  setSelectedBoard: React.Dispatch<React.SetStateAction<string>>;
  setBoards: React.Dispatch<React.SetStateAction<Boards[]>>;
  createBoard: (token: any, boardData: any) => void;
  deleteBoard: (token: any, boardData: any, workspaceUuid: any) => void;
  isBoardSelectedGlobal: boolean;
  setIsBoardSelectedGlobal: React.Dispatch<React.SetStateAction<boolean>>;
  boardsLoading: boolean;
  setBoardsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
interface WorkspaceContextProviderProps {
  children: ReactNode;
}

//call the useContext
const BoardContext = createContext<BoardContextType | null>(null);

const BoardContextProvider = ({ children }: WorkspaceContextProviderProps) => {
  const { token } = useContext(UserContext) as UserContextType;
  const { selectedWorkspace, localSelectedWorkspace, workspaces } = useContext(
    WorkspaceContext
  ) as WorkspaceContextType;
  const [boards, setBoards] = useState<Boards[]>([]);
  const [selectedBoard, setSelectedBoard] = useState("");
  const [isBoardSelectedGlobal, setIsBoardSelectedGlobal] = useState(false);
  const [favorites, setFavorites] = useState<Boards[]>([]);
  const [boardsLoading, setBoardsLoading] = useState(false);
  //create the boards
  const searchParams = useSearchParams();
  useEffect(() => {
    let board = searchParams.get("board");
    if (board) {
      setSelectedBoard(board);
      setIsBoardSelectedGlobal(true);
    }
  }, [searchParams]);

  const createBoard = async (token: any, boardData: any) => {
    if (!boardData || !token) return;
    try {
      const { isStared, name, workspaceUuid, boardUuid, image } = boardData;

      if (!name) {
        console.error("Board name is required");
        return;
      }
      const res = await workspaceBoards.createBoard(
        token,
        { isStared, name, workspaceUuid, boardUuid, image },
        workspaceUuid
      );
    } catch (error) {
      toast.error("Error creating the board");
    }
  };
  //Delete the board function
  const deleteBoard = async (
    token: any,
    workspaceUuid: any,
    boardData: any
  ) => {
    try {
      const res = await workspaceBoards.deleteBoard(
        token,
        workspaceUuid,
        boardData
      );
      if (res?.status === true) {
      }
    } catch (error) {
      console.error("Error creating a new board", error);
    }
  };

  const getBoards = async () => {
    setBoardsLoading(true);
    let res = await workspaceBoards.getBoards(token, selectedWorkspace);
    setBoards(res?.data || []);
    setBoardsLoading(false);
  };

  useEffect(() => {
    const fetchFavorites = async (token: string, workspaces: Workspace[]) => {
      try {
        const favoritesPromises = await workspaces.map(
          async (workspace: any) => {
            const res = await workspaceBoards.getBoards(token, workspace.uuid);

            return res?.data.filter((board: any) => board.isStared === true);
          }
        );
        const favoritesArray = await Promise.all(favoritesPromises);
        const favorites = favoritesArray.flat();
        setFavorites(favorites);
      } catch (error) {
        console.error("Failed to fetch favorites", error);
      }
    };

    // Fetch favorites when the component mount
    fetchFavorites(token, workspaces);
  }, [token, workspaces, boards]);

  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io(`${projectConfig.apiBaseUrl}/v2/boards`, {});
      socketRef.current.on("board", (data) => {
        if (data?.type === "update") {
          setBoards((prevBoards) => {
            const updatedBoards = [...prevBoards];
            const existingBoardIndex = updatedBoards.findIndex(
              (board) => board.uuid === data.data.uuid
            );
            if (existingBoardIndex !== -1) {
              updatedBoards[existingBoardIndex] = data.data;
            } else {
              updatedBoards.push(data.data);
            }
            return updatedBoards;
          });
        } else if (data?.type === "delete") {
          setBoards(boards.filter((board) => board.uuid !== data.data.uuid));
        } else if (data?.type === "create") {
          setBoards((prevBoards) => {
            const updatedBoards = [...prevBoards];
            updatedBoards.push(data.data);
            return updatedBoards;
          });
        }
      });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []);
  useEffect(() => {
    if (token || !selectedWorkspace) {
      if (selectedWorkspace) {
        getBoards();
      }
    }
  }, [token, selectedWorkspace]);

  // useEffect(() => {
  //   if (token) {
  //     fetchFavorites(token, selectedWorkspace);
  //   }
  // }, [token]);
  const contextValue: BoardContextType = {
    boards,
    setBoards,
    selectedBoard,
    setSelectedBoard,
    createBoard,
    deleteBoard,
    isBoardSelectedGlobal,
    setIsBoardSelectedGlobal,
    favorites,
    setFavorites,
    boardsLoading,
    setBoardsLoading,
  };
  return (
    <BoardContext.Provider value={contextValue}>
      {children}
    </BoardContext.Provider>
  );
};

export { BoardContext, BoardContextProvider };
