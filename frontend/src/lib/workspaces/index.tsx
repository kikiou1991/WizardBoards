export const userWorkspaces = {
  fetchWorkspaces: async (token: any) => {
    console.log('Fetching workspaces...');
    
    try {
      const response = await fetch('https://gadorjani.co.uk/api/workspaces', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('response:', response.status);

      if(!response.ok) {
        throw new Error(`Failed to fetch workspaces. Status: ${response.status}`)
      }
      let data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching workspaces', error);
      return Promise.reject(error)
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
