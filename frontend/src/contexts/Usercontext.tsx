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
  fetchWorkspaces: (token: any | null) => Promise<void>;
  handleLogout: (token: any | null) => Promise<void>;
  authenticated: boolean | false;
  userData: any;
  setAuthenticated: (authenticated: boolean) => void;
  createBoard: (token: any, boardData: any) => Promise<void>;
}
interface UserContextProviderProps {
  children: ReactNode;
}
//call the useContext
const UserContext = createContext<UserContextType | null>(null);

const UserContextProvider = ({children}: UserContextProviderProps) => {
  const [token, setToken] = useState<string | null>(null);
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
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
      const res = await workspaceBoards.createBoard(boardData, token);
      console.log(res);
  
      if (res && res.newBoard) {
        setBoards([res.newBoard, ...boards]);
      }
    } catch (error) {
      // handle errors if needed
      console.error('Error creating the board', error);
    }
  };
  

  const fetchWorkspaces = async (token: any) => {
    try {
      let res = await userWorkspaces.fetchWorkspaces(token);
      console.log(res);
      setWorkspaces(res?.data || []);
    } catch (error) {
      // Handle error if needed
      console.error('Error fetching workspaces:', error);
    } finally {
      setIsLoading(false);
    }
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
    fetchWorkspaces,
    authenticated,
    setAuthenticated,
    userData: user,
    handleLogout,
    createBoard,
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
