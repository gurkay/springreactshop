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