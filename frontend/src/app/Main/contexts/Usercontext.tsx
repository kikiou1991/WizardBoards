import { createContext, useState, useEffect, ReactNode } from "react";

interface Workspace {
  _id: string;
  name: string;
  // Add other properties if needed
}
interface UserContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  workspaces: Workspace[]; 
  fetchWorkspaces: () => Promise<void>;
}

const UserContext = createContext<UserContextType | null>(null);

interface UserContextProviderProps {
  children: ReactNode;
}

const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [token, setToken] = useState<string | null>(null);
  const [workspaces, setWorkspaces] = useState<any[]>([]);

  //function to fetch the workspaces

  const fetchWorkspaces = async () => {
    try {
      
      const response = await fetch("https://gadorjani.co.uk/api/workspaces");
      const data = await response.json();
      setWorkspaces(data.workspaces);
    } catch (error) {
      console.error("Error fetching workspaces", error);
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

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
