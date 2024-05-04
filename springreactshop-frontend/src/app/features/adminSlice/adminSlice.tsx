import { createSlice } from "@reduxjs/toolkit";
import { adminInitialState } from "../../initials/adminInitialState";
import { adminExtraReducers } from "./adminExtraReducers";

export const adminSlice = createSlice({
    name: "adminSlice",
    initialState: adminInitialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        adminExtraReducers.builderGetAdminHome(builder);
    }
});

export const { } = adminSlice.actions;
export default adminSlice.reducer;