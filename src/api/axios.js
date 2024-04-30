import axios from "axios";

const baseURL = "https://localhost:7222/api"; // API adresinizi buraya yazın
var tokenJson = localStorage.getItem("token");
var token = JSON.parse(tokenJson);
token = "Bearer " + token;
const axiosInstance = axios.create({
  baseURL,
  headers: {
    Authorization: token, // localStorage'dan token alınarak Authorization başlığına eklenir
  },
});

const loginRequest = async (username, password) => {
  try {
    const response = await axiosInstance.post("/Login", { username, password });
    return response.data;
  } catch (error) {
    throw new Error("Login failed. Please try again.");
  }
};
const AddCustomer = async (
  customerName,
  customerSurname,
  customerIdentityNumber,
  customerPhoneNumber,
  customerEmail,
  customerRegistryDateLong
) => {
  try {
    var customerId = "";
    const response = await axiosInstance.post("/Customer/AddCustomer", {
      customerId,
      customerName,
      customerSurname,
      customerIdentityNumber,
      customerPhoneNumber,
      customerEmail,
      customerRegistryDateLong,
    });
    return response.data;
  } catch (error) {
    throw new Error("SignUp failed. Please try again.");
  }
};
const UpdateCustomer = async (
  customerId,
  customerName,
  customerSurname,
  customerIdentityNumber,
  customerPhoneNumber,
  customerEmail,
  customerRegistryDateLong
) => {
  try {
    const response = await axiosInstance.put(`/Customer/UpdateCustomer/${customerId}`, {
      customerName,
      customerSurname,
      customerIdentityNumber,
      customerPhoneNumber,
      customerEmail,
      customerRegistryDateLong,
    });
    return response.data;
  } catch (error) {
    throw new Error("Update user failed. Please try again.");
  }
};
const getAllCustomers = async () => {
  try {
    const response = await axiosInstance.get("/Customer/GetAllCustomers", {});
    return response.data;
  } catch (error) {
    console.error("Get all customers error:", error);
    throw new Error("An error occurred while fetching customers. Please try again.");
  }
};
const getCustomerById = async (customerId) => {
  try {
    const response = await axiosInstance.post("/Customer/GetCustomerById", {
      customerId,
    });
    return response.data;
  } catch (error) {
    throw new Error("Get user by Id failed. Please try again.");
  }
};


const deleteCustomer = async (customerId) => {
  try {
    const response = await axiosInstance.delete('/Customer/DeleteCustomer/', { customerId});
    return response.data;
  } catch (error) {
    throw new Error('Customer Deleting is failed. Please try again.');
  }
};

export { loginRequest, AddCustomer, UpdateCustomer, getAllCustomers, getCustomerById, deleteCustomer };
