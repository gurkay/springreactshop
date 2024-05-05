import { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit";
import { IUserDto, IUserInitialState } from "../../../interfaces/IUserInitialState";
import { getAllUsers } from "./userCreateAsyncThunk";
import { StatusConsts } from "../../../constants/StatusConsts";

export const userExtraReducers = {
    builderGetAllUsers: function(builder: ActionReducerMapBuilder<IUserInitialState>) {
        builder.addCase(getAllUsers.pending, (state) => {
            state.loading = true;
            state.status = StatusConsts.LOADING;
        });
    
        builder.addCase(getAllUsers.fulfilled, (state, action: PayloadAction<IUserDto[]>) => {
            state.loading = false;
            state.users = action.payload;
            state.status = StatusConsts.SUCCESS;
        });
    
        builder.addCase(getAllUsers.rejected, (state) => {
            state.loading = false;
            state.status = StatusConsts.ERROR;
        });
    }
}