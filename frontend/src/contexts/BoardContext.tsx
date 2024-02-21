'use client';
import { UserContext, UserContextType } from '@/contexts/Usercontext';
import { workspaceBoards } from '@/lib/v2/boards';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { WorkspaceContext, WorkspaceContextType } from './WorkspaceContext';

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
export interface BoardContextType {
  boards: Boards[];
  selectedBoard: string;
  setSelectedBoard: React.Dispatch<React.SetStateAction<string>>;
  setBoards: React.Dispatch<React.SetStateAction<Boards[]>>;
  createBoard: (token: any, boardData: any) => void;
  deleteBoard: (token: any, boardData: any, workspaceUuid: any) => void;
}
interface WorkspaceContextProviderProps {
  children: ReactNode;
}
//call the useContext
const BoardContext = createContext<BoardContextType | null>(null);

const BoardContextProvider = ({ children }: WorkspaceContextProviderProps) => {
  const { token } = useContext(UserContext) as UserContextType;
 //need to import selectedWroksapce from workspaceContext
  const { selectedWorkspace, localSelectedWorkspace } = useContext(WorkspaceContext) as WorkspaceContextType;
  const [boards, setBoards] = useState<Boards[]>([]);
  const [selectedBoard, setSelectedBoard] = useState('');
 //create the boards
  const createBoard = async (token: any, boardData: any) => {
    try {
      const {name, workspaceUuid} = boardData;

      if (!name) {
        console.error('Board name is required');
        return;
      }
      console.log('workspaceUuid', workspaceUuid);
      const res = await workspaceBoards.createBoard(token, {name, workspaceUuid}, localSelectedWorkspace);

      if (res && res.newBoard) {
        setBoards([res.newBoard, ...boards]);
      }
    } catch (error) {
      console.error('Error creating the board', error);
    }
  };
  //Delete the board function
  const deleteBoard = async(token: any, boardData: any, workspaceUuid: any) =>{
    try {
        const res = await workspaceBoards.deleteBoard(token, workspaceUuid, boardData); 
        if(res?.status === true) {
            setBoards(boards.filter((board) => board.uuid !== boardData._id))
        }
        
    } catch (error) {
        console.error('Error creating a new board', error);
    }
  }

  const getBoards = async () => {
    let res = await workspaceBoards.getBoards(token, selectedWorkspace);
    console.log(res);
  };
  useEffect(() => {
    let socket = io('http://localhost:3002/api/v2/boards', {});
    socket.on('board', (data) => {
      console.log(data);
    });
  }, []);

  useEffect(() => {
    if (token) {
      if (selectedWorkspace) {
        getBoards();
      }
    }
  }, [token, selectedWorkspace]);
  const contextValue: BoardContextType = {
    boards,
    setBoards,
    selectedBoard,
    setSelectedBoard,
    createBoard,
    deleteBoard,
  };
  return <BoardContext.Provider value={contextValue}>{children}</BoardContext.Provider>;
};

export { BoardContext, BoardContextProvider };
