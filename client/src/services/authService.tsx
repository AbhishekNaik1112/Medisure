import axios from "axios";

export const registerUser = async (email: string, password: string, role: string) => {
  return axios.post("http://localhost:3000/users/register", { email, password, role });
};

export const loginUser = async (email: string, password: string) => {
  return axios.post("http://localhost:3000/auth/login", { email, password });
};
