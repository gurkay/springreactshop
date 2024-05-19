import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { userInitialState } from "../../initials/userInitialState";
import { userExtraReducers } from "./userExtraReducers";
import { IUserDto } from "../../../interfaces/dtos/IUserDto";

export const userSlice = createSlice({
    name: "userSlice",
    initialState: userInitialState,
    reducers: {
        clearUser: (state) => {
            state.user = userInitialState.user;
        },
        clearUsers: (state) => {
            state.users = userInitialState.users;
        },
        clearLoading: (state) => {
            state.loading = userInitialState.loading;
        },
        clearStatus: (state) => {
            state.status = userInitialState.status;
        },
        setUser: (state, action: PayloadAction<IUserDto>) => {
            state.user = action.payload;
        },
        setUserRoles: (state, action: PayloadAction<IUserDto>) => {
            state.user = action.payload;
        }
    },
    extraReducers: (builder) => {
        userExtraReducers.builderGetAllUsers(builder);
        userExtraReducers.builderGetUserById(builder);
        userExtraReducers.builderCreateUser(builder);
    }
});

export const {
    clearUser,
    clearUsers,
    clearLoading,
    clearStatus,
    setUser,
} = userSlice.actions;
export default userSlice.reducer;