import projectConfig from "@/components/projectConfig";

export const listCards = {
  fetchCard: async (token: any, listUuid: string) => {
    try {
      const response = await fetch(
        `${projectConfig.apiBaseUrl}/v2/cards?listUuid=${encodeURIComponent(
          listUuid
        )}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch cards");
      }
      const data = await response.json();
      return data;
    } catch (error: any) {
      console.error("Error fetching the cards: ", error.message);
    }
  },
  createCard: async (token: any, cardData: any, listUuid: string) => {
    console.log("cardData", cardData);
    try {
      const response = await fetch(`${projectConfig.apiBaseUrl}/v2/cards`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          listUuid,
          data: cardData,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to create a new card");
      }
      const newCard = await response.json();

      return { newCard };
    } catch (error: any) {
      console.error("Error creating a new card: ", error.message);
    }
  },
  deleteCard: async (token: any, cardUuid: string, listUuid: string) => {
    try {
      const response = await fetch(
        `${projectConfig.apiBaseUrl}/v2/cards/archive`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cardUuid,
            listUuid,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete card");
      }
      const data = await response.json();
      return data;
    } catch (error: any) {
      console.error("Error deleting card: ", error.message);
    }
  },
  addDescription: async (token: any, cardUuid: string, description: string) => {
    try {
      const response = await fetch(
        `${projectConfig.apiBaseUrl}/v2/cards/description`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cardUuid,
            description,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to add description");
      }
      const data = await response.json();
      return data;
    } catch (error: any) {
      console.error("Error adding description: ", error.message);
    }
  },
  addCardMember: async (token: any, cardUuid: string, memberUuid: string) => {
    console.log("cardUuid", cardUuid);
    console.log("memberUuid", memberUuid);
    try {
      const response = await fetch(
        `${projectConfig.apiBaseUrl}/v2/cards/member`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cardUuid,
            memberId: memberUuid,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to add member");
      }
      const data = await response.json();
      return data;
    } catch (error: unknown) {}
  },
};
