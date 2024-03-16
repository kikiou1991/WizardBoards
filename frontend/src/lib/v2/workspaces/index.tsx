import projectConfig from "@/components/projectConfig";

export const userWorkspaces = {
  getWorkspace: async (token: any) => {
    try {
      const response = await fetch(
        `${projectConfig.apiBaseUrl}/v2/workspaces`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch workspaces");
      }
      const data = await response.json();
      return data;
    } catch (error: any) {
      console.error("Error fetching workspaces: ", error.message);
      return Promise.reject(error);
    }
  },
  createWorkspace: async (token: any, workspaceData: any) => {
    try {
      const response = await fetch(
        `${projectConfig.apiBaseUrl}/v2/workspaces`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: workspaceData,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to create workspace");
      }
      const data = await response.json();
      return data;
    } catch (error: any) {
      console.error("Error creating workspace: ", error.message);
    }
  },
  deleteWorkspace: async (token: any, workspaceData: string) => {
    try {
      const response = await fetch(
        `${projectConfig.apiBaseUrl}/v2/workspaces/archive`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            workspaceUUID: workspaceData,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete workspace");
      } else {
        const data = await response.json();
        return data;
      }
    } catch (error: any) {}
  },
  addUserToWorkspace: async (
    token: any,
    workspaceUuid: string,
    userUuid: string
  ) => {
    try {
      const response = await fetch(
        `${projectConfig.apiBaseUrl}/v2/workspaces/user`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            workspaceUuid,
            userUuid,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to add user to workspace");
      }
      const data = await response.json();
      return data;
    } catch (error: unknown) {
      console.error("Error while trying to add user to workspace: ", error);
    }
  },
};
