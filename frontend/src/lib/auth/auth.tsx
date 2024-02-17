export const userAuth = {
  validateToken: async (token: any) => {
    try {
      const response = await fetch('https://wizardboards.co.uk/api/auth/validate', {
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
};
