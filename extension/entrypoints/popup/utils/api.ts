import { ApiResponse, Tab } from "../types";

export const testConnection = async (
  url: string,
  token: string
): Promise<boolean> => {
  try {
    const response = await fetch(`${url}/tabs`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.ok;
  } catch (error) {
    console.error("Connection test failed:", error);
    return false;
  }
};

export const fetchRemoteTabs = async (
  apiUrl: string,
  authToken: string
): Promise<Tab[] | null> => {
  if (!apiUrl || !authToken) return null;

  try {
    const response = await fetch(`${apiUrl}/tabs`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data: ApiResponse = await response.json();
      return data.tabs;
    }
  } catch (error) {
    console.error("Error fetching remote tabs:", error);
  }
  return null;
};

export const deleteAllRemoteTabs = async (
  apiUrl: string,
  authToken: string
): Promise<boolean> => {
  if (!apiUrl || !authToken) return false;

  try {
    const response = await fetch(`${apiUrl}/tabs`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    });

    return response.ok;
  } catch (error) {
    console.error("Error deleting all remote tabs:", error);
    return false;
  }
};

export const generateToken = async (apiUrl: string): Promise<string> => {
  const response = await fetch(`${apiUrl}/devices/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const data = await response.json();
    return data.token;
  } else {
    const errorText = await response.text();
    throw new Error(
      `Failed to generate token: ${response.status} ${errorText}`
    );
  }
};
