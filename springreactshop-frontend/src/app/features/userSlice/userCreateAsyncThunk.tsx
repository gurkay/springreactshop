import { createAsyncThunk } from "@reduxjs/toolkit";
import UserService from "../../../services/user/UserService";
import { IUserDto } from "../../../interfaces/dtos/IUserDto";

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

export const updateUser: any = createAsyncThunk('updateUser', async (payload: { userId: number, userDto: IUserDto }) => {
  const { userId, userDto } = payload;
  const response = await UserService.updateUser(userId, userDto);
  return Promise.resolve(response);
});

export const deleteUser: any = createAsyncThunk('deleteUser', async (id: number) => {
  const response = await UserService.deleteUser(id);
  return Promise.resolve(response);
});

export const isEmailUnique: any = createAsyncThunk('isEmailUnique', async (email: string) => {
  const response = await UserService.isEmailUnique(email);
  return Promise.resolve(response);
})