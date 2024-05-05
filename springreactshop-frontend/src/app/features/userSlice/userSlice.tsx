import { createSlice } from "@reduxjs/toolkit";
import { userInitialState } from "../../initials/userInitialState";
import { userExtraReducers } from "./userExtraReducers";

export const userSlice = createSlice({
    name: "userSlice",
    initialState: userInitialState,
    reducers: {},
    extraReducers: (builder) => {
        userExtraReducers.builderGetAllUsers(builder);
    }
});

export const {} = userSlice.actions;
export default userSlice.reducer;