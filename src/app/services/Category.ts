import { getProductList } from "../types/product";
import { secureApi } from "./instance";
import { Category, CreateCategoryDto } from "../types/category";
export const getAllCategories = async () => {
  try {
    const response = await secureApi.get("/categories");
    console.log(response.data);
    return response.data as Category[];
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



export const addCategoryMain = async (categoryData: any) => {
  // categoryData must be FormData for file upload
  try {
    const response = await secureApi.post("/categories", categoryData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("Category added:", response.data);
    return response.data.data;
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
