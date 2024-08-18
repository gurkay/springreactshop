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

export const createUser: any = createAsyncThunk('createUser', async (payload: {userDto: IUserDto, image?: File}) => {
  const { userDto, image } = payload;
  const response = await UserService.createUser(userDto, image!);
  return Promise.resolve(response);
});

export const createUserNoUserPhotos: any = createAsyncThunk('createUserNoUserPhotos', async (payload: {userDto: IUserDto}) => {
  const { userDto } = payload;
  const response = await UserService.createUserNoUserPhotos(userDto);
  return Promise.resolve(response);
});

export const updateUser: any = createAsyncThunk('updateUser', async (payload: { userId: number, userDto: IUserDto, image: File }) => {
  const { userId, userDto, image } = payload;
  const response = await UserService.updateUser(userId, userDto, image);
  return Promise.resolve(response);
});

export const updateUserWithoutPhotos: any = createAsyncThunk('updateUserWithoutPhotos', async (payload: { userId: number, userDto: IUserDto }) => {
  const { userId, userDto } = payload;
  const response = await UserService.updateUserWithoutPhotos(userId, userDto);
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

export const updateUserEnabledStatus: any = createAsyncThunk('updateUserEnabledStatus', async (payload: { userId: number, enabled: boolean }) => {
  const { userId, enabled } = payload;
  const response = await UserService.updateUserEnabledStatus(userId, enabled);
  return Promise.resolve(response);
})

export const listByPage: any = createAsyncThunk('listByPage', async (userListPath: string) => {
  const response = await UserService.listByPage(userListPath);
  return Promise.resolve(response);
});

export const exportUsersToCSV: any = createAsyncThunk('exportUsersToCSV', async (path: string) => {
  const response = await UserService.exportUsersToCSV(path);
  return Promise.resolve(response);
});

export const exportUsersToExcel: any = createAsyncThunk('exportUsersToExcel', async (path: string) => {
  const response = await UserService.exportUsersToExcel(path);
  return Promise.resolve(response);
});
