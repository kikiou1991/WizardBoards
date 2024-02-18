'use client';
import {UserContext, UserContextType} from '@/contexts/Usercontext';
import {workspaceBoards} from '@/lib/v2/boards';
import {ReactNode, createContext, useContext, useEffect, useState} from 'react';
import {io} from 'socket.io-client';

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
export interface WorkspaceContextType {
  workspaces: Workspace[];
  boards: Boards[];
  lists: Lists[];
  cards: Cards[];
  selectedWorkspace: string;
  localSelectedWorkspace: string;
  setLocalSelectedWorkspace: React.Dispatch<React.SetStateAction<string>>;
  setSelectedWorkspace: React.Dispatch<React.SetStateAction<string>>;
  setBoards: React.Dispatch<React.SetStateAction<Boards[]>>;
  setWorkspace: (workspace: Workspace | null) => void;
  setCards: React.Dispatch<React.SetStateAction<Cards[]>>;
  setFavorites: React.Dispatch<React.SetStateAction<Boards[]>>;
  setLists: React.Dispatch<React.SetStateAction<Lists[]>>;
}
interface WorkspaceContextProviderProps {
  children: ReactNode;
}
//call the useContext
const WorkspaceContext = createContext<WorkspaceContextType | null>(null);

const WorkspaceContextProvider = ({children}: WorkspaceContextProviderProps) => {
  const {token} = useContext(UserContext) as UserContextType;

  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace | null>(null);
  const [selectedWorkspace, setSelectedWorkspace] = useState('');
  const [localSelectedWorkspace, setLocalSelectedWorkspace] = useState('');
  const [boards, setBoards] = useState<Boards[]>([]);
  const [selectedBoard, setSelectedBoard] = useState('');
  const [lists, setLists] = useState<Lists[]>([]);
  const [cards, setCards] = useState<Cards[]>([]);
  const [favorites, setFavorites] = useState<Boards[]>([]);

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
  const contextValue: WorkspaceContextType = {
    boards,
    setBoards,
    workspaces,
    lists,
    cards,
    selectedWorkspace,
    localSelectedWorkspace,
    setLocalSelectedWorkspace,
    setSelectedWorkspace,
    setCards,
    setLists,
    setFavorites,
  };
  return <WorkspaceContext.Provider value={contextValue}>{children}</WorkspaceContext.Provider>;
};

export {WorkspaceContext, WorkspaceContextProvider};
