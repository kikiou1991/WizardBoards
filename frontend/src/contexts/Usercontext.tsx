'use client';
import InputField from '@/app/auth/sign-in/InputField';
import {userAuth} from '@/lib/auth/auth';
import { workspaceBoards } from '@/lib/boards';
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
export interface UserContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  workspaces: Workspace[];
  boards: Boards[];
  selectedWorkspace: string;
  setSelectedWorkspace: React.Dispatch<React.SetStateAction<string>>;
  fetchWorkspaces: (token: any | null) => Promise<void>;
  currentWorkspace: Workspace | null;
  setWorkspace: (workspace: Workspace | null) => void;
  handleLogout: (token: any | null) => Promise<void>;
  authenticated: boolean | false;
  userData: any;
  setAuthenticated: (authenticated: boolean) => void;
  createBoard: (token: any, boardData: any) => Promise<void>;
  fetchBoard: (token: any, workspaceUuid: string) => Promise<void>;
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
  
  const [boards, setBoards] = useState<Boards[]>([]);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const [authenticatedLoaded, setAuthenticatedLoaded] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

//create boards
  const createBoard = async (token: any, boardData: any) => {
    try {
      const res = await workspaceBoards.createBoard(token, boardData, selectedWorkspace);
      console.log(res);
      
      if (res && res.newBoard) {
        setBoards([res.newBoard, ...boards]);
      }
    } catch (error) {
     
      console.error('Error creating the board', error);
    }
  };
  // Fetch boards
  const fetchBoard = async (token: any, workspaceUuid: string) => {
    try {
      const res = await workspaceBoards.fetchBoard(token, selectedWorkspace);
      console.log(res)
      setBoards(res?.data || []);
    } catch (error) {
      //error handling

      console.error('Failed to fetch boards', error)
    }
  }
  
  //  fetch workspaces

  const fetchWorkspaces = async (token: any) => {
    try {
      let res = await userWorkspaces.fetchWorkspaces(token);
      
      setWorkspaces(res?.data || []);
    } catch (error) {
      // Handle error if needed
      console.error('Error fetching workspaces:', error);
    } finally {
      setIsLoading(false);
    }
  };

  //set workspaces

  const setWorkspace = (workspace: Workspace | null) => {
    setCurrentWorkspace(workspace);
  };

  const validateToken = async (token: any) => {
    try {
      let res = await userAuth.validateToken(token);
      if (res?.status === true) {
        setAuthenticated(true);
        setUser(res?.data?.user);
      }
    } catch (error) {
      // Handle error if needed
      console.error('Error validating token:', error);
    } finally {
      setAuthenticatedLoaded(true);
    }
  };

  useEffect(() => {
    if (localStorage['token']) {
      setToken(localStorage['token']);
      validateToken(localStorage['token']);
      fetchWorkspaces(localStorage['token']);
    }
  }, []);

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
    selectedWorkspace,
    setSelectedWorkspace,
    authenticated,
    setAuthenticated,
    userData: user,
    handleLogout,
    createBoard,
    fetchBoard,
    currentWorkspace,
    setWorkspace
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
