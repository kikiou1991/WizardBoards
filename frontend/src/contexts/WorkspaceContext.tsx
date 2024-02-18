'use client';
import InputField from '@/app/auth/sign-in/InputField';
import {userAuth} from '@/lib/auth/auth';
import {workspaceBoards} from '@/lib/boards';
import {listCards} from '@/lib/cards';
import {boardLists} from '@/lib/lists';
import {userWorkspaces} from '@/lib/workspaces';
import {Modal, ModalBody, ModalContent, ModalHeader} from '@nextui-org/modal';
import {Button, Link} from '@nextui-org/react';
import {usePathname, useRouter} from 'next/navigation';
import {ReactNode, createContext, useEffect, useState, useContext} from 'react';
import {io} from 'socket.io-client'
import { UserContext, UserContextType } from '@/contexts/Usercontext';

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
  authenticated: boolean | false;
  setCards: React.Dispatch<React.SetStateAction<Cards[]>>;
  fetchCards: (token: any, listUuid: string) => Promise<void>;
  setFavorites: React.Dispatch<React.SetStateAction<Boards[]>>;
  setLists: React.Dispatch<React.SetStateAction<Lists[]>>;

}
interface WorkspaceContextProviderProps {
  children: ReactNode;
}
//call the useContext
const WorkspaceContext = createContext<WorkspaceContextType | null>(null);

const WorkspaceContextProvider = ({children}: WorkspaceContextProviderProps) => {
  const { token} = useContext(UserContext) as UserContextType;

const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace | null>(null);
  const [selectedWorkspace, setSelectedWorkspace] = useState('');
  const [localSelectedWorkspace, setLocalSelectedWorkspace] = useState('');
  const [boards, setBoards] = useState<Boards[]>([]);
  const [selectedBoard, setSelectedBoard] = useState('');
  const [lists, setLists] = useState<Lists[]>([]);
  const [cards, setCards] = useState<Cards[]>([]);
  const [favorites, setFavorites] = useState<Boards[]>([]);

  useEffect(() =>{
    let socket = io("http://localhost:3002/api/v2/boards", { })
  socket.on('board', (data) => {
    console.log(data)
  })

  }, [])

  const contextValue: WorkspaceContextType = {
    
  };
  return (
    <WorkspaceContext.Provider value={contextValue}>
      
      {children}
    </WorkspaceContext.Provider>
  );
};

export {WorkspaceContext, WorkspaceContextProvider};
