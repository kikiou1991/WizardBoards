"use client";
import InputField from "@/app/auth/sign-in/InputField";
import { userAuth } from "@/lib/auth/auth";
import { workspaceBoards } from "@/lib/boards";
import { listCards } from "@/lib/cards";
import { boardLists } from "@/lib/lists";
import { userWorkspaces } from "@/lib/workspaces";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/modal";
import { Button, Link } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { BoardContext, BoardContextType } from "./BoardContext";
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
export interface UserContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  handleLogout: (token: any | null) => Promise<void>;
  authenticated: boolean | false;
  userData: any;
  setAuthenticated: (authenticated: boolean) => void;
  validateToken: (token: any) => Promise<void>;
}
interface UserContextProviderProps {
  children: ReactNode;
}
//call the useContext
const UserContext = createContext<UserContextType | null>(null);

const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [token, setToken] = useState<string | null>(null);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const [authenticatedLoaded, setAuthenticatedLoaded] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  const validateToken = async (token: any) => {
    try {
      let res = await userAuth.validateToken(token);
      if (res?.status === true) {
        setAuthenticated(true);
        setUser(res?.data?.user);
      }
    } catch (error) {
      // Handle error if needed
      console.error("Error validating token:", error);
    } finally {
      setAuthenticatedLoaded(true);
    }
  };

  //UseEffect for setting the token
  useEffect(() => {
    if (localStorage["token"]) {
      setToken(localStorage["token"]);
    }
  }, []);
  //UseEffect for validating the token
  useEffect(() => {
    if (token) {
      validateToken(token);
    }
  }, [token]); //if the token changes, validate it

  //logout function: clear the local storage and set the token to null
  const handleLogout = async () => {
    localStorage.clear();
    // setWorkspaces([]);
    setToken(null);
    setAuthenticated(false);
    setAuthenticatedLoaded(false);
    router.replace("/auth/sign-in");
  };

  const contextValue: UserContextType = {
    token,
    setToken,
    authenticated,
    setAuthenticated,
    userData: user,
    handleLogout,
    validateToken,
  };
  return (
    <UserContext.Provider value={contextValue}>
      {!authenticated &&
        authenticatedLoaded &&
        !pathname.startsWith("/auth/sign-in") &&
        !pathname.startsWith("/auth/sign-up") && (
          <Modal
            isOpen={!authenticated && authenticatedLoaded}
            isDismissable={false}
            hideCloseButton
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Login
                  </ModalHeader>
                  <ModalBody className="flex flex-col items-center justify-center">
                    <InputField />
                    <div>Or</div>
                    <Button color="primary" variant="light">
                      <Link href="/auth/sign-up">Sign Up</Link>
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

export { UserContext, UserContextProvider };
