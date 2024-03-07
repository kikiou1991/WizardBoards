"use client";
import { UserContext, UserContextType } from "@/contexts/Usercontext";
import { workspaceBoards } from "@/lib/v2/boards";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { io } from "socket.io-client";
import { ListContext, ListContextType } from "./ListContext";
import { listCards } from "@/lib/v2/cards";
import { Cards } from "@/types";

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
}
interface CardContextProviderProps {
  children: ReactNode;
}
//call the useContext
const CardContext = createContext<CardContextType | null>(null);

const CardContextProvider = ({ children }: CardContextProviderProps) => {
  const { token } = useContext(UserContext) as UserContextType;
  const { lists, setLists } = useContext(ListContext) as ListContextType;
  const [cards, setCards] = useState<Cards[]>([]);
  const [isNewCardCreated, setIsNewCardCreated] = useState(false);
  const [cardDetails, setCardDetails] = useState<any>(null);

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
      if (res && res.newCard) {
        setCards((prevCards) => [...prevCards, res.newCard]);
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
  useEffect(() => {
    let socket = io("http://localhost:3002/api/v2/cards", {});
    socket.on("card", (data, uuid) => {
      console.log("socket data", data);
      if (data.type === "create") {
        console.log("running the socket to create a card");
        const newCard = data.data;
        setCards((prevCards) => {
          return [...prevCards, newCard];
        });
      } else if (data.type === "update") {
        console.log("running the socket to update a card");
        const updatedCard = data.data;
        setCards((prevCards) => {
          return [...prevCards, updatedCard];
        });
      } else if (data.type === "delete") {
        console.log("running the socket to delete a card");
        // setCards(cards.filter((card) => data.data.uuid !== card.uuid));
      } else {
        throw new Error("Failed to create card with socket");
      }
      return () => {
        socket.disconnect();
      };
    });
  }, []);

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
  };
  return (
    <CardContext.Provider value={contextValue}>{children}</CardContext.Provider>
  );
};

export { CardContext, CardContextProvider };
