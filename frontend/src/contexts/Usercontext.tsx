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
  cards: Cards[];
  handleLogout: (token: any | null) => Promise<void>;
  authenticated: boolean | false;
  userData: any;
  setAuthenticated: (authenticated: boolean) => void;
  setCards: React.Dispatch<React.SetStateAction<Cards[]>>;
  fetchCards: (token: any, listUuid: string) => Promise<void>;
  favorites: Boards[];
  setFavorites: React.Dispatch<React.SetStateAction<Boards[]>>;
  createCard: (token: any, cardData: any, listUuid: string) => Promise<void>;
  deleteCard: (token: any, cardData: any, listUuid: string) => Promise<void>;
  validateToken: (token: any) => Promise<void>;
}
interface UserContextProviderProps {
  children: ReactNode;
}
//call the useContext
const UserContext = createContext<UserContextType | null>(null);

const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [token, setToken] = useState<string | null>(null);
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [localSelectedWorkspace, setLocalSelectedWorkspace] = useState("");
  const [cards, setCards] = useState<Cards[]>([]);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const [authenticatedLoaded, setAuthenticatedLoaded] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState<Boards[]>([]);
  const [isNewCardCreated, setIsNewCardCreated] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

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
      console.error("Error validating token:", error);
      console.error("Error validating token:", error);
    } finally {
      setAuthenticatedLoaded(true);
    }
  };

  // Fetch favorites

  const fetchFavorites = async (token: any, workspaces: any) => {
    try {
      // Iterate over each workspace
      for (let workspace of workspaces) {
        // Fetch boards for the current workspace
        const res = await workspaceBoards.fetchBoard(token, workspace.uuid);

        // Filter out the boards that are marked as favorites (isStared)
        const favBoards =
          res?.data.filter((board: any) => board.isStared === true) || [];

        // Update the favorites state
        setFavorites((prevFavorites) => [...prevFavorites, ...favBoards]);
      }
    } catch (error) {
      console.error("Failed to fetch favorites", error);
    }
  };

  //  fetch workspaces for the current user
  const fetchWorkspaces = async (token: any) => {
    if (!token) {
      console.log("Token is missing");
    }

    try {
      let res = await userWorkspaces.fetchWorkspaces(token);

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

  const fetchCards = async (token: any, listUuid: string) => {
    try {
      const res = await listCards.getCards(token, listUuid);

      // Check if res.data is defined before using it
      if (res && res.data) {
        setCards((prevCards) => {
          // Filter out cards for other lists
          const filteredCards = prevCards.filter(
            (card) => card.listUuid !== listUuid
          );
          // Concatenate the new cards
          return [...filteredCards, ...res.data];
        });
      } else {
        console.error("Data not available in API response");
      }
    } catch (error) {
      console.error("Failed to fetch cards", error);
    }
  };

  const createCard = async (token: any, cardData: any, listUuid: string) => {
    console.log("cards before creation: ", cards);
    try {
      const title = cardData;
      const res = await listCards.createCard(token, title, listUuid);
      if (res && res.newCard) {
        setCards((prevCards) => [res.newCard, ...prevCards]);
      }
    } catch (error) {
      console.error("Failed to create card", error);
    } finally {
      setIsNewCardCreated(true);
    }
  };

  const deleteCard = async (token: any, cardData: any, listUuid: string) => {
    console.log("lets delete the card");
    try {
      const res = await listCards.deleteCard(token, cardData, listUuid);
      if (res?.status === true) {
        setCards(cards.filter((card) => card.uuid !== cardData.uuid));
      }
    } catch (error) {
      console.error("Failed to delete card", error);
    }
  };

  //useEffec triggered when a card is added to a list
  //
  // This Block needs fixing, need to add a dependency so cards are displayed straight away
  //
  //
  // useEffect(() => {
  //   if (isNewCardCreated) {
  //     console.log('cards changed');
  //     fetchCards(token, selectedBoard);
  //     setIsNewCardCreated(false);
  //   }
  // }, [isNewCardCreated]);

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

  //UseEffect for fetching boards  and then the lists

  //useEffect to fetch the favorites on mounting
  // useEffect(() => {
  //   // Check if both token and workspaces are available
  //   if (token && workspaces.length > 0) {
  //     // Fetch favorites
  //     fetchFavorites(token, workspaces);
  //   }
  // }, [workspaces]);

  //useEffect re render the page when there is change to favorites ??????
  // useEffect(() => {
  //   const fetchAndUpdateFavorites = async () => {
  //     if (localStorage['token'] && workspaces.length > 0) {
  //       const newFavorites = [];
  //       for (let workspace of workspaces) {
  //         const res = await workspaceBoards.fetchBoard(localStorage['token'], workspace.uuid);
  //         const favBoards = res?.data.filter((board: any) => board.isStared === true) || [];
  //         newFavorites.push(...favBoards);
  //       }
  //       setFavorites(newFavorites);
  //     }
  //   };

  //   fetchAndUpdateFavorites();
  // }, [workspaces, favorites]);
  //logout function: clear the local storage and set the token to null
  const handleLogout = async () => {
    localStorage.clear();
    setWorkspaces([]);
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
    cards,
    setCards,
    fetchCards,
    validateToken,
    favorites,
    setFavorites,
    createCard,
    deleteCard,
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
