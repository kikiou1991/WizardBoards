export const userWorkspaces = {
  getWorkspace: async (token: any) => {
    try {
      const response = await fetch('httsps://wizardboards.co.uk/api/v2/workspaces', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch workspaces');
      }
      const data = await response.json();
      return data;
    } catch (error: any) {
      console.error('Error fetching workspaces: ', error.message);
      return Promise.reject(error);
    }
  },
  createWorkspace: async (token: any, workspaceData: any) => {
    try {
      const response = await fetch('https://wizardboards.co.uk/api/v2/workspaces', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: workspaceData,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to create workspace');
      }
      const data = await response.json();
      return data;
    } catch (error: any) {
      console.error('Error creating workspace: ', error.message);
    }
  },
};
