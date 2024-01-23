'use client';
import InputField from '@/app/auth/sign-in/InputField';
import {userAuth} from '@/lib/auth/auth';
import {workspaceBoards} from '@/lib/boards';
import { boardLists } from '@/lib/lists';
import {userWorkspaces} from '@/lib/workspaces';
import {Modal, ModalBody, ModalContent, ModalHeader} from '@nextui-org/modal';
import {Button, Link} from '@nextui-org/react';
import {usePathname, useRouter} from 'next/navigation';
import {ReactNode, createContext, useEffect, useState} from 'react';

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
}

interface Lists {
  _id: string;
  name: string;
  uuid: string;
  boardId: string;
}

interface Cards {
  _id: string;
  name: string;
  uuid: string;
}
export interface UserContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  workspaces: Workspace[];
  boards: Boards[];
  lists: Lists[];
  cards: Cards[];
  selectedWorkspace: string;
  localSelectedWorkspace: string;
  setLocalSelectedWorkspace: React.Dispatch<React.SetStateAction<string>>;
  setSelectedWorkspace: React.Dispatch<React.SetStateAction<string>>;
  fetchWorkspaces: (token: any | null) => Promise<void>;
  currentWorkspace: Workspace | null;
  createWorkspace: (token: any, workspaceData: any) => Promise<void>;
  setWorkspace: (workspace: Workspace | null) => void;
  handleLogout: (token: any | null) => Promise<void>;
  authenticated: boolean | false;
  userData: any;
  setAuthenticated: (authenticated: boolean) => void;
  createBoard: (token: any, boardData: any) => Promise<void>;
  fetchBoard: (token: any, workspaceUuid: string) => Promise<void>;
  deleteBoard: (token: any, board_id: string, workspaceUuid: string) => Promise<void>;
  fetchLists: (token: any, boardUuid: string) => Promise<void>;
  createList: (token: any, listData: any, boardUuid: string) => Promise<void>;
  selectedBoard: string;
  setSelectedBoard: React.Dispatch<React.SetStateAction<string>>;
  setCards: React.Dispatch<React.SetStateAction<Cards[]>>;
}
interface UserContextProviderProps {
  children: ReactNode;
}
//call the useContext
const UserContext = createContext<UserContextType | null>(null);

const UserContextProvider = ({children}: UserContextProviderProps) => {
  const [token, setToken] = useState<string | null>(null);
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace | null>(null);
  const [selectedWorkspace, setSelectedWorkspace] = useState('');
  const [localSelectedWorkspace, setLocalSelectedWorkspace] = useState('');
  const [boards, setBoards] = useState<Boards[]>([]);
  const [selectedBoard, setSelectedBoard] = useState('');
  const [lists, setLists] = useState<Lists[]>([]);
  const [cards, setCards] = useState<Cards[]>([]);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const [authenticatedLoaded, setAuthenticatedLoaded] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
 

  //create boards
  const createBoard = async (token: any, boardData: any) => {
    try {
      const { name, workspaceUuid } = boardData;
      
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

  const validateToken = async (token: any) => {
    
    try {
      let res = await userAuth.validateToken(token);
      if (res?.status === true) {
        setAuthenticated(true);
        fetchWorkspaces(token);

        setUser(res?.data?.user);
      }
    } catch (error) {
      // Handle error if needed
      console.error('Error validating token:', error);
      console.error('Error validating token:', error);
    } finally {
      setAuthenticatedLoaded(true);
    }
  };

  // Fetch boards
  const fetchBoard = async (token: any, workspaceUuid: string) => {
    try {
      const res = await workspaceBoards.fetchBoard(token, workspaceUuid);
      setBoards(res?.data || []);
    } catch (error) {
      console.error('Failed to fetch boards', error);
    }
  };

  // Delete board

  const deleteBoard = async (token: any,  workspaceUuid: string, boardUuid: string) => {
    try {
      
      const res = await workspaceBoards.deleteBoard(token,  workspaceUuid, boardUuid);
      if (res?.status === true) {
        setBoards(boards.filter((board) => board._id !== boardUuid));
      }
    } catch (error) {
      console.error('Failed to delete board: ', error);
    }
  }
  
  //  fetch workspaces
  const fetchWorkspaces = async (token: any) => {
    if (!token) {
      console.log('Token is missing');
    }

    try {
      let res = await userWorkspaces.fetchWorkspaces(token);
      
      setWorkspaces(res?.data || []);
    } catch (error: any) {
      // Handle error if needed
      console.error('Error fetching workspaces:', error || error.message || error.response);
    } finally {
      setIsLoading(false);
    }
  };

  const createWorkspace = async (token: any, boardData: any) => {
    try {
      if (!token) {
        console.error('Token is missing');
        return;
      }
      
      const res = await userWorkspaces.createWorkspace(token, boardData);
  
      if (res) {
        console.log('Workspace created successfully:', res);
        // Update your local state or perform any other actions if needed
      } else {
        console.error('Failed to create workspace. Response:', res);
        // Handle the case when the server does not return the expected data
      }
    } catch (error: any) {
      // Handle error if needed
      console.error('Error creating workspace:', error || error.message || error.response);
    }
  };
  
  //set workspaces
  const setWorkspace = (workspace: Workspace | null) => {
    setCurrentWorkspace(workspace);
  };

  const fetchLists = async (token: any, boardUuid: string) => {
       
    try {
      const res = await boardLists.getLists(token, boardUuid);
      setLists(res?.data || []);
    }catch(error:any) {
      console.error('Failed to fetch lists', error);
    }
  }

  const createList = async (token: any, listData: any, boardUuid: string) => {
    console.log('listData: ', listData);
    console.log('boardUuid: ', boardUuid);
    
    try {
      const  title  = listData;
      const res = await boardLists.createLists(token, title, boardUuid)
      if (res && res.newList) {
        setLists([res.newList, ...lists]);
      }
    }catch(error:any) {
      console.error('Failed to create list', error);
    }
  }

  useEffect(() => {
    if (localStorage['token']) {
      setToken(localStorage['token']);
    }
  }, []);
  useEffect(() => {
    if (token) {
      validateToken(token);
    }
  }, [token]); //if the token changes, validate it
  useEffect(() => {
    if (localStorage['token'] && selectedWorkspace) {
      fetchBoard(localStorage['token'], selectedWorkspace);
      
    }
  }, [selectedWorkspace]); //if the selectedWorkspace changes, fetch the boards
  //fetch lists when it gets mounter
  useEffect(() => {
    if(localStorage['token'] && boards.length > 0){
      fetchLists(localStorage['token'], selectedBoard);
    }
  },[selectedBoard]) //if the selectedBoard changes, fetch the lists

  

  const handleLogout = async () => {
    localStorage.clear();
    setWorkspaces([]);
    setToken(null);
    setAuthenticated(false);
    setAuthenticatedLoaded(false);
    router.replace('/auth/sign-in');
  };

  const contextValue: UserContextType = {
    token,
    setToken,
    workspaces,
    boards,
    fetchWorkspaces,
    createWorkspace,
    selectedWorkspace,
    setSelectedWorkspace,
    localSelectedWorkspace,
    setLocalSelectedWorkspace,
    authenticated,
    setAuthenticated,
    userData: user,
    handleLogout,
    createBoard,
    fetchBoard,
    currentWorkspace,
    setWorkspace,
    deleteBoard,
    fetchLists,
    createList,
    lists,
    cards,
    selectedBoard,
    setSelectedBoard,
    setCards,
  };
  return (
    <UserContext.Provider value={contextValue}>
      {!authenticated && authenticatedLoaded && !pathname.startsWith('/auth/sign-in') && !pathname.startsWith('/auth/sign-up') && (
        <Modal isOpen={!authenticated && authenticatedLoaded} isDismissable={false} hideCloseButton>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className='flex flex-col gap-1'>Login</ModalHeader>
                <ModalBody className='flex flex-col items-center justify-center'>
                  <InputField />
                  <div>Or</div>
                  <Button color='primary' variant='light'>
                    <Link href='/auth/sign-up'>Sign Up</Link>
                  </Button>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
      {children}
    </UserContext.Provider>
  );
};

export {UserContext, UserContextProvider};
