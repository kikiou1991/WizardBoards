import projectConfig from "@/components/projectConfig";

export const workspaceBoards = {
  getBoards: async (token: any, workspaceUuid: string) => {
    try {
      const response = await fetch(
        `${
          projectConfig.apiBaseUrl
        }/v2/boards?workspaceUuid=${encodeURIComponent(workspaceUuid)}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to create board");
      }

      const boards = await response.json();
      return boards;
    } catch (error) {
      console.error("Error creating the board", error);
    }
  },
  createBoard: async (token: any, boardData: any, workspaceUuid: string) => {
    try {
      const { boardUuid } = boardData;
      const response = await fetch(`${projectConfig.apiBaseUrl}/v2/boards`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: boardData,
          workspaceUuid: workspaceUuid,
          boardUuid: boardUuid,
        }),
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
  deleteBoard: async (token: any, workspaceUuid: string, boardData: any) => {
    try {
      const response = await fetch(
        `${projectConfig.apiBaseUrl}/v2/boards/archive?workspaceUuid=${workspaceUuid}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            boardUuid: boardData,
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
};
