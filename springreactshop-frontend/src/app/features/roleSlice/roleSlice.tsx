import { createSlice } from "@reduxjs/toolkit";
import { roleExtraReducers } from "./roleExtraReducers";
import { roleInitialState } from "../../initials/roleInitialState";

export const roleSlice = createSlice({
    name: "roleSlice",
    initialState: roleInitialState,
    reducers: {

    },
    extraReducers: (builder) => {
        roleExtraReducers.builderGetAllRoles(builder);
        roleExtraReducers.builderGetRoleById(builder);
    }
});

export const {

} = roleSlice.actions;
export default roleSlice.reducer;