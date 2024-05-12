import { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit";
import { getAllRoles, getRoleById } from "./roleCreateAsyncThunk";
import { StatusConsts } from "../../../constants/StatusConsts";
import { IRoleInitialState } from "../../../interfaces/IRoleInitialState";
import { IRoleDto } from "../../../interfaces/dtos/IRoleDto";

export const roleExtraReducers = {
    builderGetAllRoles: function(builder: ActionReducerMapBuilder<IRoleInitialState>) {
        builder.addCase(getAllRoles.pending, (state) => {
            state.loading = true;
            state.status = StatusConsts.LOADING;
        });
    
        builder.addCase(getAllRoles.fulfilled, (state, action: PayloadAction<IRoleDto[]>) => {
            state.loading = false;
            state.roles = action.payload;
            state.status = StatusConsts.SUCCESS;
        });
    
        builder.addCase(getAllRoles.rejected, (state) => {
            state.loading = false;
            state.status = StatusConsts.ERROR;
        });
    },

    builderGetRoleById: function(builder: ActionReducerMapBuilder<IRoleInitialState>) {
        builder.addCase(getRoleById.pending, (state) => {
            state.loading = true;
            state.status = StatusConsts.LOADING;
        });
    
        builder.addCase(getRoleById.fulfilled, (state, action: PayloadAction<IRoleDto>) => {
            state.loading = false;
            state.role = action.payload;
            state.status = StatusConsts.SUCCESS;
        });
    
        builder.addCase(getRoleById.rejected, (state) => {
            state.loading = false;
            state.status = StatusConsts.ERROR;
        });
    },
}