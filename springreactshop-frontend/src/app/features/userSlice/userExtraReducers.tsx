import { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit";
import { IUserInitialState } from "../../../interfaces/IUserInitialState";
import { createUser, deleteUser, getAllUsers, getUserById, isEmailUnique } from "./userCreateAsyncThunk";
import { StatusConsts } from "../../../constants/StatusConsts";
import { IUserDto } from "../../../interfaces/dtos/IUserDto";

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
    },

    builderGetUserById: function(builder: ActionReducerMapBuilder<IUserInitialState>) {
        builder.addCase(getUserById.pending, (state) => {
            state.loading = true;
            state.status = StatusConsts.LOADING;
        });
    
        builder.addCase(getUserById.fulfilled, (state, action: PayloadAction<IUserDto>) => {
            state.loading = false;
            state.user = action.payload;
            state.status = StatusConsts.SUCCESS;
        });
    
        builder.addCase(getUserById.rejected, (state) => {
            state.loading = false;
            state.status = StatusConsts.ERROR;
        });
    },

    builderCreateUser: function(builder: ActionReducerMapBuilder<IUserInitialState>) {
        builder.addCase(createUser.pending, (state) => {
            state.loading = true;
            state.status = StatusConsts.LOADING;
        });
    
        builder.addCase(createUser.fulfilled, (state, action: PayloadAction<IUserDto>) => {
            state.loading = false;
            state.user = action.payload;
            state.status = StatusConsts.SUCCESS;
        });
    
        builder.addCase(createUser.rejected, (state) => {
            state.loading = false;
            state.status = StatusConsts.ERROR;
        });
    },

    buildIsEmailUnique: function(builder: ActionReducerMapBuilder<IUserInitialState>) {
        builder.addCase(isEmailUnique.pending, (state) => {
            state.loading = true;
            state.status = StatusConsts.LOADING;
        });

        builder.addCase(isEmailUnique.fulfilled, (state, action: PayloadAction<boolean>) => {
            state.loading = false;
            state.isEmailUnique = action.payload;
            state.status = StatusConsts.SUCCESS;
        });

        builder.addCase(isEmailUnique.rejected, (state) => {
            state.loading = false;
            state.status = StatusConsts.ERROR;
        });
    },

    buildDeleteUser: function(builder: ActionReducerMapBuilder<IUserInitialState>) {
        builder.addCase(deleteUser.pending, (state) => {
            state.loading = true;
            state.status = StatusConsts.LOADING;
        });

        builder.addCase(deleteUser.fulfilled, (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.status = StatusConsts.SUCCESS;
            state.result = action.payload;
        });

        builder.addCase(deleteUser.rejected, (state) => {
            state.loading = false;
            state.status = StatusConsts.ERROR;
        });
    }
}