import { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit";
import { IUserInitialState } from "../../../interfaces/IUserInitialState";
import { createUser, createUserNoUserPhotos, deleteUser, getAllUsers, getUserById, isEmailUnique, listByPage, updateUser, updateUserWithoutPhotos } from "./userCreateAsyncThunk";
import { StatusConsts } from "../../../constants/StatusConsts";
import { IUserDto } from "../../../interfaces/dtos/IUserDto";
import { IUserResponseDto } from "../../../interfaces/dtos/IUserResponseDto";

export const userExtraReducers = {
    builderGetAllUsers: function(builder: ActionReducerMapBuilder<IUserInitialState>) {

        builder.addCase(getAllUsers.pending, (state) => {
            state.loading = true;
            state.status = StatusConsts.LOADING;
        });
    
        builder.addCase(getAllUsers.fulfilled, (state, action: PayloadAction<IUserResponseDto>) => {
            console.log(action.payload);
            state.loading = false;
            state.userResponseDto = action.payload;
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
    
        builder.addCase(createUser.fulfilled, (state, action: PayloadAction<IUserResponseDto>) => {
            state.loading = false;
            state.user = action.payload.userDto!;
            state.status = StatusConsts.SUCCESS;
            state.responseMessage = action.payload.userDto!.email + action.payload.message;
        });
    
        builder.addCase(createUser.rejected, (state) => {
            state.loading = false;
            state.status = StatusConsts.ERROR;
        });
    },

    builderCreateUserNoUserPhotos: function(builder: ActionReducerMapBuilder<IUserInitialState>) {
        builder.addCase(createUserNoUserPhotos.pending, (state) => {
            state.loading = true;
            state.status = StatusConsts.LOADING;
        });
    
        builder.addCase(createUserNoUserPhotos.fulfilled, (state, action: PayloadAction<IUserResponseDto>) => {
            state.loading = false;
            state.user = action.payload.userDto!;
            state.status = StatusConsts.SUCCESS;
            state.responseMessage = action.payload.userDto!.email + action.payload.message;
        });
    
        builder.addCase(createUserNoUserPhotos.rejected, (state) => {
            state.loading = false;
            state.status = StatusConsts.ERROR;
        });
    },

    builderUpdateUser: function(builder: ActionReducerMapBuilder<IUserInitialState>) {
        builder.addCase(updateUser.pending, (state) => {
            state.loading = true;
            state.status = StatusConsts.LOADING;
        });
    
        builder.addCase(updateUser.fulfilled, (state, action: PayloadAction<IUserResponseDto>) => {
            state.loading = false;
            state.userResponseDto = action.payload!;
            state.status = StatusConsts.SUCCESS;
            state.userResponseDto.message = action.payload.userDto!.email + action.payload.message;
        });
    
        builder.addCase(updateUser.rejected, (state) => {
            state.loading = false;
            state.status = StatusConsts.ERROR;
        });
    },

    builderUpdateUserWithoutPhotos: function(builder: ActionReducerMapBuilder<IUserInitialState>) {
        builder.addCase(updateUserWithoutPhotos.pending, (state) => {
            state.loading = true;
            state.status = StatusConsts.LOADING;
        });
    
        builder.addCase(updateUserWithoutPhotos.fulfilled, (state, action: PayloadAction<IUserResponseDto>) => {
            state.loading = false;
            state.userResponseDto = action.payload!;
            state.status = StatusConsts.SUCCESS;
            state.userResponseDto.message = action.payload.userDto!.email + action.payload.message;
        });
    
        builder.addCase(updateUserWithoutPhotos.rejected, (state) => {
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
            state.responseMessage = action.payload;
        });

        builder.addCase(deleteUser.rejected, (state) => {
            state.loading = false;
            state.status = StatusConsts.ERROR;
        });
    },

    buildListByPage: function(builder: ActionReducerMapBuilder<IUserInitialState>) {
        builder.addCase(listByPage.pending, (state) => {
            state.loading = true;
            state.status = StatusConsts.LOADING;
        });

        builder.addCase(listByPage.fulfilled, (state, action: PayloadAction<IUserResponseDto>) => {
            console.log(action.payload);
            state.loading = false;
            state.userResponseDto = action.payload;
            state.status = StatusConsts.SUCCESS;
            state.responseMessage = action.payload.userDto!.email + action.payload.message;
        });
    
        builder.addCase(listByPage.rejected, (state) => {
            state.loading = false;
            state.status = StatusConsts.ERROR;
        });
    }
}