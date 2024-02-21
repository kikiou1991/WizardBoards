'use client';
import { UserContext, UserContextType } from '@/contexts/Usercontext';
import { workspaceBoards } from '@/lib/v2/boards';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { ListContext, ListContextType } from './ListContext';

// Interfaces Section


interface Cards {
  _id: string;
  title: string;
  uuid: string;
  cardIndex: number;
  listUuid: string;
}
export interface CardContextType {
  cards: Cards[];
  setCards: React.Dispatch<React.SetStateAction<Cards[]>>;
}
interface CardContextProviderProps {
  children: ReactNode;
}
//call the useContext
const CardContext = createContext<CardContextType | null>(null);

const CardContextProvider = ({ children }: CardContextProviderProps) => {
  const { token } = useContext(UserContext) as UserContextType;
const {lists, setLists} = useContext(ListContext) as ListContextType
  const [cards, setCards] = useState<Cards[]>([]);

  useEffect(() => {
    let socket = io('http://localhost:3002/api/v2/boards', {});
    socket.on('card', (data) => {
    });
  }, []);

  
  const contextValue: CardContextType = {
    cards,
    setCards,
  };
  return <CardContext.Provider value={contextValue}>{children}</CardContext.Provider>;
};

export { CardContext, CardContextProvider };
