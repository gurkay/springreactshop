import { createAsyncThunk } from "@reduxjs/toolkit";
import UserService from "../../../services/user/UserService";

export const getAllUsers: any = createAsyncThunk('getAllUsers', async () => {
  const response = await UserService.getAllUsers();
  console.log(response);
  return Promise.resolve(response);
});