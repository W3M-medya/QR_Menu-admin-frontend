import axios from "axios";


const API_URL = process.env.NEXT_PUBLIC_BASE_URL;


if (!API_URL) {
  throw new Error("API URL tanımlı değil. Lütfen .env dosyanızda NEXT_PUBLIC_BASE_URL değişkenini tanımlayın.");
}

console.log("API URL:", API_URL);
export const secureApi = axios.create({
  baseURL: API_URL,
});

// purchaseApi.interceptors.request.use((config) => {
//   const { token } = authStore.getState();

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });
// request interceptor to add the auth token header to requests

// secureApi.interceptors.request.use((config) => {
//   const { token } = authStore.getState();

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });
// // response interceptor to get error messages from response and translate them
// secureApi.interceptors.response.use(
//   (res) => res,
//   (error) => {
//     if (!error.response) {
//       error.response = { data: "Network Error" };
//       return Promise.reject(error);
//     }

//     if (error.response.status === 401) {
//       error.response = { data: "Unauthorized" };
//       const { logOut } = authStore.getState();
//       logOut();
//       return Promise.reject(error);
//     }
//     throw error.response?.data || "Something went wrong";
//   }
// );

// purchaseApi.interceptors.response.use(
//   (res) => res,
//   (error) => {
//     if (!error.response) {
//       error.response = { data: "Network Error" };
//       return Promise.reject(error);
//     }

//     if (error.response.status === 401) {
//       error.response = { data: "Unauthorized" };
//       const { logOut } = authStore.getState();
//       logOut();
//       return Promise.reject(error);
//     }
//     throw error.response?.data || "Something went wrong";
//   }
// );
