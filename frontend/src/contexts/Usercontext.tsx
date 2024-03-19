"use client";
import InputField from "@/app/auth/sign-in/InputField";
import { userAuth } from "@/lib/auth/auth";
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
import { Workspace, Boards, Lists, Cards } from "@/types";
import { WorkspaceContext, WorkspaceContextType } from "./WorkspaceContext";
import { userList } from "@/lib/v2/users";

// Interfaces Section

export interface UserContextType {
  token: any | null;
  setToken: (token: any | null) => void;
  authenticated: boolean | false;
  userData: any;
  setAuthenticated: (authenticated: boolean) => void;
  validateToken: (token: any) => Promise<void>;
  user: any;
  allUsers: any;
  setAuthenticatedLoaded: (authenticatedLoaded: boolean) => void;
}
interface UserContextProviderProps {
  children: ReactNode;
}
//call the useContext
const UserContext = createContext<UserContextType | null>(null);

const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [token, setToken] = useState<string | null>(null);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  // const { setWorkspaces } = useContext(
  //   WorkspaceContext
  // ) as WorkspaceContextType;
  const [user, setUser] = useState<any>(null);
  const [allUsers, setAllUsers] = useState<any>([]);
  const [authenticatedLoaded, setAuthenticatedLoaded] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const validateToken = async (token: any) => {
    try {
      let res = await userAuth.validateToken(token);
      if (res?.status === true) {
        setUser(res?.data);
      }
      setAuthenticated(true);
    } catch (error) {
      // Handle error if needed
      console.error("Error validating token:", error);
    } finally {
      setAuthenticatedLoaded(true);
    }
  };
  const fetchUsers = async (token: any, selectedWorkspace: any) => {
    try {
      const res = await userList.getAllUsers(token);
      setAllUsers(
        res?.users.data.map((user: any) => {
          const { password, ...rest } = user;
          return rest;
        })
        //we return everything but the users` password
      );
    } catch (error: unknown) {
      console.error("Error while trying to fetch users: ", error);
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

  useEffect(() => {
    if (token) {
      fetchUsers(token, "selectedWorkspace");
    }
  }, [token]);

  //logout function: clear the local storage and set the token to null

  const contextValue: UserContextType = {
    token,
    setToken,
    authenticated,
    setAuthenticated,
    userData: user,
    validateToken,
    user,
    allUsers,
    setAuthenticatedLoaded,
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
