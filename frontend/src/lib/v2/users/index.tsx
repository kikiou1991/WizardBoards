import projectConfig from "@/components/projectConfig";

export const userList = {
  getAllUsers: async (token: any) => {
    try {
      const response = await fetch(`${projectConfig.apiBaseUrl}/v2/users`, {
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
  getWorkspaceMembers: async (token: any, workspaceId: any) => {
    try {
      const response = await fetch(
        `${projectConfig.apiBaseUrl}/v2/workspaces/members?workspaceUUID=${workspaceId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const users = await response.json();
      return { users };
    } catch (error: unknown) {
      console.error("Error while trying to fetch users: ", error);
    }
  },
  verifyUserEmail: async (token: any, email: any) => {
    try {
      const response = await fetch(
        `${projectConfig.apiBaseUrl}/v2/users/email`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to verify user email");
      }
      const data = await response.json();
      return data;
    } catch (error: unknown) {
      console.error("Error while trying to verify user email: ", error);
    }
  },
};
