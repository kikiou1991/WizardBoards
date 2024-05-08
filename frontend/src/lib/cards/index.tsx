import projectConfig from "@/components/projectConfig";

export const listCards = {
  createCard: async (token: any, cardData: any, listUuid: string) => {
    console.log("token", token);
    try {
      const { title } = cardData;
      const response = await fetch(`${projectConfig.apiBaseUrl}/v2/cards`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          listUuid,
          title,
        }),
      });
      //check if the response is okay
      if (!response.ok) {
        throw new Error("Failed to create card");
      }

      const newCard = await response.json();

      return { newCard };
    } catch (error: any) {
      console.error("Error creating card: ", error.message);
    }
  },

  getCards: async (token: any, listUuid: string) => {
    try {
      const response = await fetch(
        `http://${projectConfig.apiBaseUrl}/cards?listUuid=${encodeURIComponent(
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
      console.log("response: ", response);
      const data = await response.json();
      console.log("data: ", data);
      return data;
    } catch (error: any) {
      console.error("Error fetching cards: ", error.message);
    }
  },

  deleteCard: async (token: any, cardUuid: string, listUuid: string) => {
    try {
      const response = await fetch(
        `http://${projectConfig.apiBaseUrl}/cards/delete`,
        {
          method: "DELETE",
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
};
