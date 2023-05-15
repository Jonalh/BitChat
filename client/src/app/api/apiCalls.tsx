import axios from "./axios";

let prefix = "/api/v1";

// Register user
export const register = (data: any) => {
  return axios.post(`${prefix}/user/register`, data);
};

// Login user
export const login = async (data: any) => {
  return axios.post(`${prefix}/user/login`, data);
};

// Get user by email
export const getUser = (email: any) => {
  return axios.get(`${prefix}/user/${email}`);
};

// Get friends
export const getFriends = (id: any) => {
  return axios.get(`${prefix}/user/friend/${id}`);
};

// Get chat
export const getChat = (user1: any, user2: any) => {
  return axios.get(`${prefix}/chat/findchat/${user1}/${user2}`);
};
