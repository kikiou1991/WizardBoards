'use client';
import {userWorkspaces} from '@/lib/workspaces';
import {ReactNode, createContext, useEffect, useState} from 'react';

// Interfaces Section
interface Workspace {
  _id: string;
  name: string;
}
export interface UserContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  workspaces: Workspace[];
  fetchWorkspaces: () => Promise<void>;
}
interface UserContextProviderProps {
  children: ReactNode;
}
//call the useContext
const UserContext = createContext<UserContextType | null>(null);

const UserContextProvider = ({children}: UserContextProviderProps) => {
  const [token, setToken] = useState<string | null>(null);
  const [workspaces, setWorkspaces] = useState<any[]>([]);

  //function to fetch the workspaces

  const fetchWorkspaces = async () => {
    let res = await userWorkspaces.fetchWorkspaces(token);
    setWorkspaces(res.workspaces);
  };

  useEffect(() => {
    // Fetch workspaces when the component mounts
    fetchWorkspaces();
  }, []);

  //function to fetch the token and store it locally

  //

  const contextValue: UserContextType = {
    token,
    setToken,
    workspaces,
    fetchWorkspaces,
  };

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};

export {UserContext, UserContextProvider};
