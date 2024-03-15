import projectConfig from "@/components/projectConfig";

export const boardLists = {
  getLists: async (token: any, boardUuid: string) => {
    try {
      const response = await fetch(
        `${projectConfig.apiBaseUrl}/v2/lists?boardUuid=${boardUuid}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch lists");
      }

      const newList = await response.json();
      return { newList };
    } catch (error: any) {
      console.error("Error while trying to fetch lists: ", error.message);
    }
  },
  createList: async (
    token: any,
    listData: any,
    boardUuid: string,
    listUuid?: string
  ) => {
    try {
      const response = await fetch(`${projectConfig.apiBaseUrl}/v2/lists`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          boardUuid,

          data: listData,
          //should contain the title and the listUuid, when it gets updated
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to create list");
      }

      const newList = await response.json();
      return { newList };
    } catch (error: any) {
      console.error("Error creating list: ", error.message);
    }
  },
  deleteList: async (token: any, boardUuid: string, listData: any) => {
    try {
      const response = await fetch(
        `${projectConfig.apiBaseUrl}/v2/lists/archive`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            boardUuid,
            listUUID: listData.uuid,
            data: listData,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete the list");
      } else {
        const data = await response.json();
        return data;
      }
    } catch (error: any) {
      console.error("Error deleting the list: ", error.message);
    }
  },
};
