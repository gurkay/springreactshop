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
        clearResponseMessage: (state) => {
            state.responseMessage = '';
        },
        setUser: (state, action: PayloadAction<IUserDto>) => {
            state.user = action.payload;
        },
        setResponseMessage: (state, action: PayloadAction<string>) => {
            state.responseMessage = action.payload;
        }
    },
    extraReducers: (builder) => {
        userExtraReducers.builderGetAllUsers(builder);
        userExtraReducers.builderGetUserById(builder);
        userExtraReducers.builderCreateUser(builder);
        userExtraReducers.buildIsEmailUnique(builder);
    }
});

export const {
    clearUser,
    clearUsers,
    clearLoading,
    clearStatus,
    setUser,
    setResponseMessage
} = userSlice.actions;
export default userSlice.reducer;