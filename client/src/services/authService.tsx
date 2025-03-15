import axios from "axios";

export const registerUser = async (email: string, password: string, role: string) => {
  return axios.post("https://claims-management-system-2d30.onrender.com/users/register", { email, password, role });
};

export const loginUser = async (email: string, password: string) => {
  return axios.post("https://claims-management-system-2d30.onrender.com/auth/login", { email, password });
};
