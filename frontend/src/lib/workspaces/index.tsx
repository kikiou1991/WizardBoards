export const userWorkspaces = {
  fetchWorkspaces: async (token: any) => {
    try {
      const response = await fetch('https://gadorjani.co.uk/api/workspaces', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching workspaces', error);
    }
  },
  createWorkspace: async (token: any, name: String) => {
    try {
      const response = await fetch('https://gadorjani.co.uk/api/workspaces', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: name,
        }),
      });
      let data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching workspaces', error);
    }
  },
};
