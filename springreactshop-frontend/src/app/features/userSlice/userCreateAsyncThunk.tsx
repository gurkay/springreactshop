import { createAsyncThunk } from "@reduxjs/toolkit";
import UserService from "../../../services/user/UserService";

export const getAllUsers: any = createAsyncThunk('getAllUsers', async () => {
  const response = await UserService.getAllUsers();
  return Promise.resolve(response);
});

export const getUserById: any = createAsyncThunk('getUserById', async (id: number) => {
  const response = await UserService.getUserById(id);
  return Promise.resolve(response);
});

export const createUser: any = createAsyncThunk('createUser', async (user: any) => {
  const response = await UserService.createUser(user);
  return Promise.resolve(response);
});

export const updateUser: any = createAsyncThunk('updateUser', async (user: any) => {
  const response = await UserService.updateUser(user.userId, user);
  return Promise.resolve(response);
});

export const deleteUser: any = createAsyncThunk('deleteUser', async (id: number) => {
  const response = await UserService.deleteUser(id);
  return Promise.resolve(response);
});