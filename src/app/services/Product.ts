import { getProductList } from "../types/product";
import { secureApi } from "./instance";
export const getAllProduct = async () => {
  try {
    const response = await secureApi.get("/products");
    console.log(response.data);
    return response.data.data as getProductList[];
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "response" in error &&
      (error as any).response?.data
    ) {
      throw (error as any).response.data;
    }
    throw "Something went wrong";
  }
};
