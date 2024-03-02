"use client";
import { UserContext, UserContextType } from "@/contexts/Usercontext";
import { userWorkspaces } from "@/lib/v2/workspaces";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { io } from "socket.io-client";
import { Workspace } from "@/types";

// Interfaces Section

//
//
//
//
//
//
//
//

export interface WorkspaceContextType {
  workspaces: Workspace[];
  selectedWorkspace: string;
  currentWorkspace: Workspace | null;
  localSelectedWorkspace: string;
  setLocalSelectedWorkspace: React.Dispatch<React.SetStateAction<string>>;
  setSelectedWorkspace: React.Dispatch<React.SetStateAction<string>>;
  setWorkspace: (workspace: Workspace | null) => void;
  createWorkspace: (token: any, boardData: any) => void;
  fetchWorkspaces: (token: any) => void;
  deleteWorkspace: (token: any, workspaceData: any) => void;
}
interface WorkspaceContextProviderProps {
  children: ReactNode;
}
const WorkspaceContext = createContext<WorkspaceContextType | null>(null);

const WorkspaceContextProvider = ({
  children,
}: WorkspaceContextProviderProps) => {
  const { token, authenticated } = useContext(UserContext) as UserContextType;

  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace | null>(
    null
  );
  const [selectedWorkspace, setSelectedWorkspace] = useState("");
  const [localSelectedWorkspace, setLocalSelectedWorkspace] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchWorkspaces = async (token: any) => {
    if (!token) {
      console.log("Token is missing");
    }

    try {
      let res = await userWorkspaces.getWorkspace(token);

      setWorkspaces(res?.data || []);
    } catch (error: any) {
      // Handle error if needed
      console.error(
        "Error fetching workspaces:",
        error || error.message || error.response
      );
    } finally {
      setIsLoading(false);
    }
  };

  //create a new workspace

  const createWorkspace = async (token: any, boardData: any) => {
    try {
      if (!token) {
        console.error("Token is missing");
        return;
      }

      const res = await userWorkspaces.createWorkspace(token, boardData);

      if (res) {
        console.log("Workspace created successfully:", res);
        // Update your local state or perform any other actions if needed
      } else {
        console.error("Failed to create workspace. Response:", res);
        // Handle the case when the server does not return the expected data
      }
    } catch (error: any) {
      // Handle error if needed
      console.error(
        "Error creating workspace:",
        error || error.message || error.response
      );
    }
  };
  const deleteWorkspace = async (token: any, workspaceData: any) => {
    try {
      const res = await userWorkspaces.deleteWorkspace(token, workspaceData);
      if (res?.status === true) {
        console.log("Workspace deleted successfully:", res);
        setWorkspaces((prevWorkspaces) =>
          prevWorkspaces.filter(
            (workspace) => workspace.uuid !== workspaceData.uuid
          )
        );
      }
    } catch (error) {}
  };

  //set workspaces for the current user
  const setWorkspace = (workspace: Workspace | null) => {
    setCurrentWorkspace(workspace);
  };

  useEffect(() => {
    if (token) {
      fetchWorkspaces(token);
    }
  }, [token]);
  const contextValue: WorkspaceContextType = {
    workspaces,
    selectedWorkspace,
    localSelectedWorkspace,
    currentWorkspace,
    setWorkspace,
    setLocalSelectedWorkspace,
    setSelectedWorkspace,
    createWorkspace,
    fetchWorkspaces,
    deleteWorkspace,
  };
  return (
    <WorkspaceContext.Provider value={contextValue}>
      {children}
    </WorkspaceContext.Provider>
  );
};

export { WorkspaceContext, WorkspaceContextProvider };
