export const workspaceBoards = {
  getBoards: async (token: any, workspaceUuid: string) => {
    try {
      const response = await fetch(`https://wizardboards.co.uk/api/v2/boards?workspaceUuid=${encodeURIComponent(workspaceUuid)}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to create board');
      }

      const boards = await response.json();
      return boards;
    } catch (error) {
      console.error('Error creating the board', error);
    }
  },
  createBoard: async (token: any, boardData: any, workspaceUuid: string) => {
    try {
      const { name } = boardData;
      const simplifiedBoardData = { name, workspaceUuid };
      console.log(simplifiedBoardData);
      const response = await fetch('https://wizardboards.co.uk/api/v2/boards', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(simplifiedBoardData),
      });

      if (!response.ok) {
        throw new Error('Failed to create board');
      }

      const newBoard = await response.json();
      return { newBoard };
    } catch (error) {
      console.error('Error creating the board', error);
    }
  },
  deleteBoard: async (token: any, workspaceUuid: string, boardUuid: string) => {
    try {
      const response = await fetch('https://wizardoards.co.uk/api/v2/boards/archive', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          boardUuid,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error('Failed to delete board');
      }
    } catch (error) {
      console.error('Error deleting the board', error);
    }
  },
};
