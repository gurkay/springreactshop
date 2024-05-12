import { createAsyncThunk } from "@reduxjs/toolkit";
import RoleService from "../../../services/user/RoleService";
import { IRoleDto } from "../../../interfaces/dtos/IRoleDto";

export const getRoleById: any = createAsyncThunk('getRoleById', async (id: number) => {
  const response = await RoleService.getRoleById(id);
  return Promise.resolve(response);
});

export const createRole: any = createAsyncThunk('createRole', async (user: any) => {
  const response = await RoleService.createRole(user);
  return Promise.resolve(response);
});

export const updateRole: any = createAsyncThunk('updateRole', async (payload: { roleId: number, roleDto: IRoleDto }) => {
  const { roleId, roleDto } = payload;
  const response = await RoleService.updateRole(roleId, roleDto);
  return Promise.resolve(response);
});

export const deleteRole: any = createAsyncThunk('deleteRole', async (id: number) => {
  const response = await RoleService.deleteRole(id);
  return Promise.resolve(response);
});

export const getAllRoles: any = createAsyncThunk('getAllRoles', async () => {
  const response = await RoleService.getAllRoles();
  return Promise.resolve(response);
});