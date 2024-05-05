import { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit";
import { IAdminInitialState } from "../../../interfaces/IAdminInitialState";
import { getAdminHome } from "./adminCreateAsyncThunk";
import { StatusConsts } from "../../../constants/StatusConsts";
import { IAdminDto } from "../../../interfaces/dtos/IAdminDto";

export const adminExtraReducers = {
    builderGetAdminHome: function(builder: ActionReducerMapBuilder<IAdminInitialState>) {
        builder.addCase(getAdminHome.pending, (state) => {
            state.loading = true;
            state.status = StatusConsts.LOADING;
        });
    
        builder.addCase(getAdminHome.fulfilled, (state, action: PayloadAction<IAdminDto>) => {
            state.loading = false;
            state.admin = action.payload;
            state.status = StatusConsts.SUCCESS;
        });
    
        builder.addCase(getAdminHome.rejected, (state) => {
            state.loading = false;
            state.status = StatusConsts.ERROR;
        });
    },
}