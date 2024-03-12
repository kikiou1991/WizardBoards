export const boardLists = {
  createLists: async (token: any, listData: any, boardUuid: string) => {
    try {
      const { title } = listData;
      const response = await fetch(
        "http://${projectConfig.apiBaseUrl}/v2/lists",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            boardUuid,
            title,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to create list");
      }

      const newList = await response.json();
      return { newList };
    } catch (error: any) {
      console.error("Error creating list: ", error.message);
    }
  },

  getLists: async (token: any, boardUuid: string) => {
    try {
      const response = await fetch(
        `http://${
          projectConfig.apiBaseUrl
        }/lists?boardUuid=${encodeURIComponent(boardUuid)}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch lists");
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      console.error("Error fetching lists: ", error.message);
    }
  },
};
