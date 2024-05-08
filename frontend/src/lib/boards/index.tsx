import projectConfig from "@/components/projectConfig";

export const workspaceBoards = {
  createBoard: async (token: any, boardData: any, workspaceUuid: string) => {
    try {
      const { name } = boardData;
      const simplifiedBoardData = { name, workspaceUuid };
      const response = await fetch(`${projectConfig.apiBaseUrl}/boards`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(simplifiedBoardData),
      });

      if (!response.ok) {
        throw new Error("Failed to create board");
      }

      const newBoard = await response.json();
      return { newBoard };
    } catch (error) {
      console.error("Error creating the board", error);
    }
  },

  fetchBoard: async (token: any, workspaceUuid: string) => {
    try {
      const response = await fetch(
        `http://${
          projectConfig.apiBaseUrl
        }/boards?workspaceUuid=${encodeURIComponent(workspaceUuid)}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch boards");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching the board", error);
    }
  },

  deleteBoard: async (token: any, workspaceUuid: string, boardUuid: string) => {
    try {
      const response = await fetch(
        "http://${projectConfig.apiBaseUrl}/boards/delete",
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Ensure the correct content type
          },
          body: JSON.stringify({
            workspaceUuid,
            boardUuid,
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error("Failed to delete board");
      }
    } catch (error) {
      console.error("Error deleting the board", error);
    }
  },

  upDateBoard: async (token: any, boardUuid: string, boardData: any) => {
    try {
      const response = await fetch(
        `http://${projectConfig.apiBaseUrl}/boards/update/?boardUuid=${boardUuid}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(boardData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update board");
      }
      const data = await response.json();
      return data;
    } catch (error: any) {
      console.error("Error updating the board", error);
    }
  },
};
