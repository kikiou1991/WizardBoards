'use client';
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
    try {
      const response = await fetch('https://gadorjani.co.uk/api/workspaces', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setWorkspaces(data.workspaces);
    } catch (error) {
      console.error('Error fetching workspaces', error);
    }
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
