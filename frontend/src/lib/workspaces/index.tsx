export const userWorkspaces = {
  fetchWorkspaces: async (token: any) => {
    try {
      const response = await fetch('https://wizardbards.co.uk/api/workspaces', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch workspaces. Status: ${response.status}`);
      }
      let data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching workspaces', error);
      return Promise.reject(error);
    }
  },
  createWorkspace: async (token: any, boardData: any) => {
    console.log('Creating workspace with...', boardData);
    try {
      const response = await fetch('https://wizardboards.co.uk/api/workspaces', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: boardData.name }),
      });
      let data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching workspaces', error);
    }
  },
};
