"use client";
import { UserContext, UserContextType } from "@/contexts/Usercontext";
import { workspaceBoards } from "@/lib/v2/boards";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";
import { ListContext, ListContextType } from "./ListContext";
import { listCards } from "@/lib/v2/cards";
import { Cards } from "@/types";
import { useRouter } from "next/navigation";
import { WorkspaceContext, WorkspaceContextType } from "./WorkspaceContext";
import projectConfig from "@/components/projectConfig";

// Interfaces Section

export interface CardContextType {
  cards: Cards[];
  setCards: React.Dispatch<React.SetStateAction<Cards[]>>;
  isNewCardCreated: boolean;
  setIsNewCardCreated: React.Dispatch<React.SetStateAction<boolean>>;
  fetchCards: (token: any, listUuid: string) => Promise<void>;
  createCard: (token: any, cardData: any, listUuid: string) => Promise<void>;
  deleteCard: (token: any, cardData: any, listUuid: string) => Promise<void>;
  cardDetails: Cards;
  setCardDetails: React.Dispatch<React.SetStateAction<any>>;
  handleLogout: () => void;
}
interface CardContextProviderProps {
  children: ReactNode;
}
//call the useContext
const CardContext = createContext<CardContextType | null>(null);

const CardContextProvider = ({ children }: CardContextProviderProps) => {
  const { token, setToken, setAuthenticated, setAuthenticatedLoaded } =
    useContext(UserContext) as UserContextType;
  const { lists, setLists } = useContext(ListContext) as ListContextType;
  const { setWorkspaces } = useContext(
    WorkspaceContext
  ) as WorkspaceContextType;
  const [cards, setCards] = useState<Cards[]>([]);
  const [isNewCardCreated, setIsNewCardCreated] = useState(false);
  const [cardDetails, setCardDetails] = useState<any>(null);
  const router = useRouter();
  const fetchCards = async (token: any, listUuid: string) => {
    if (!listUuid) return;
    try {
      const res = await listCards.fetchCard(token, listUuid);
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
    try {
      const res = await listCards.createCard(token, cardData, listUuid);
      // if (res && res.newCard) {
      //   setCards((prevCards) => [...prevCards, res.newCard]);
      // }
    } catch (error) {
      console.error("Failed to create card", error);
    } finally {
      setIsNewCardCreated(true);
    }
  };

  const deleteCard = async (token: any, cardData: any, listUuid: string) => {
    try {
      const res = await listCards.deleteCard(token, cardData, listUuid);
      if (res?.status === true) {
        setCards((prevCards) =>
          prevCards.filter((card) => card.uuid !== cardData.uuid)
        );
      }
    } catch (error) {
      console.error("Failed to delete card", error);
    }
  };
  // fetch cards for each lists on render or if the lists change
  useEffect(() => {
    if (localStorage["token"] && lists.length > 0) {
      for (let list of lists) {
        fetchCards(localStorage["token"], list.uuid);
      }
    }
  }, [lists]);

  const socketRef = useRef<Socket | null>(null);
  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io(`${projectConfig.apiBaseUrl}/v2/cards`, {});
    }

    const socket = socketRef.current;

    socket.on("card", (data: any, uuid: string) => {
      if (data.type === "create") {
        const newCard = data.data;
        // Check if the card already exists
        if (!cards.some((card) => card.uuid === newCard.uuid)) {
          setCards((prevCards) => {
            return [...prevCards, newCard];
          });
        }
      } else if (data.type === "update") {
        const updatedCard = data.data;
        setCards((prevCards) => {
          return prevCards?.map((card) => {
            if (card.uuid === updatedCard?.uuid) {
              return updatedCard;
            }
            return card;
          });
        });
      } else if (data.type === "delete") {
        setCards((prevCards) =>
          prevCards.filter((card) => card.uuid !== data.data.uuid)
        );
      } else {
        throw new Error("Failed to create card with socket");
      }
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []);
  const handleLogout = async () => {
    localStorage.clear();
    setWorkspaces([]);
    setToken(null);
    setAuthenticated(false);
    setAuthenticatedLoaded(false);
    router?.replace("/auth/sign-in");
  };

  const contextValue: CardContextType = {
    cards,
    setCards,
    isNewCardCreated,
    setIsNewCardCreated,
    fetchCards,
    createCard,
    deleteCard,
    cardDetails,
    setCardDetails,
    handleLogout,
  };
  return (
    <CardContext.Provider value={contextValue}>{children}</CardContext.Provider>
  );
};

export { CardContext, CardContextProvider };
