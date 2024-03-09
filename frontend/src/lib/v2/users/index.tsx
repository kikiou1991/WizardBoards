export const userList = {
  getAllUsers: async (token: any) => {
    try {
      const response = await fetch(`http://localhost:3002/api/v2/users`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const users = await response.json();
      return { users };
    } catch (error: unknown) {
      console.error("Error while trying to fetch users: ", error);
    }
  },
};
