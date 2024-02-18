export const workspaceBoards = {
  getBoards: async (token: any, workspaceUuid: string) => {
    try {
      const response = await fetch('https://wizardboards.co.uk/api/v2/boards', {
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
};
