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
import { WorkspaceContext, WorkspaceContextType } from "./WorkspaceContext";
import { Boards } from "@/types";

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
  //create the boards
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

      if (res) {
        // setBoards((prevBoards) => {
        //   const updatedBoards = [...prevBoards];
        //   const existingBoardIndex = updatedBoards.findIndex(
        //     (board) => board.uuid === res.data.uuid
        //   );
        //   if (existingBoardIndex !== -1) {
        //     updatedBoards[existingBoardIndex] = res.data;
        //   } else {
        //     updatedBoards.push(res.data);
        //   }
        //   return updatedBoards;
        // });
      }
    } catch (error) {
      console.error("Error creating the board", error);
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
    let res = await workspaceBoards.getBoards(token, selectedWorkspace);
    setBoards(res?.data || []);
  };

  useEffect(() => {
    const fetchFavorites = async (token: any, workspaces: any) => {
      try {
        // Iterate over each workspace
        let favorites: any[] = [];
        for (let workspace of workspaces) {
          // Fetch boards for the current workspace
          const res = await workspaceBoards.getBoards(token, workspace.uuid);
          // Filter out the boards that are marked as favorites

          res?.data.forEach((board: any) => {
            if (board.isStared === true) {
              favorites.push(board);
            }
          });
        }
        setFavorites(favorites);
      } catch (error) {
        console.error("Failed to fetch favorites", error);
      }
    };

    // Fetch favorites when the component mounts
    fetchFavorites(token, workspaces);
  }, [token, workspaces]);

  //useEffect re render the page when there is change to favorites ??????
  // useEffect(() => {
  //   const fetchAndUpdateFavorites = async () => {
  //     if (localStorage['token'] && workspaces.length > 0) {
  //       const newFavorites = [];
  //       for (let workspace of workspaces) {
  //         const res = await workspaceBoards.fetchBoard(localStorage['token'], workspace.uuid);
  //         const favBoards = res?.data.filter((board: any) => board.isStared === true) || [];
  //         newFavorites.push(...favBoards);
  //       }
  //       setFavorites(newFavorites);
  //     }
  //   };

  //   fetchAndUpdateFavorites();
  // }, [ favorites]);

  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io("http://localhost:3002/api/v2/boards", {});
      socketRef.current.on("board", (data) => {
        console.log("data", data);
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
  };
  return (
    <BoardContext.Provider value={contextValue}>
      {children}
    </BoardContext.Provider>
  );
};

export { BoardContext, BoardContextProvider };
