import { secureApi } from "./instance";

export const Login = async (username: string, password: string) => {
  try {
    console.log("Attempting login with:", { username, password });
    const response = await secureApi.post("/users/login", { username, password });
    console.log("Login response:", response.data);
    return response.data;
  } catch (error) {
    if (typeof error === "object" && error !== null && "response" in error && (error as any).response?.data) {
      throw (error as any).response.data;
    }
    throw "Something went wrong";
  }
};


 