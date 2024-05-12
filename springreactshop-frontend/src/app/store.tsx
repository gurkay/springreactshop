import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import adminReducer from './features/adminSlice/adminSlice';
import userReducer from './features/userSlice/userSlice';
import roleReducer from './features/roleSlice/roleSlice';

export const store = configureStore({
  reducer: {
    adminReducer: adminReducer,
    userReducer: userReducer,
    roleReducer: roleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export const useAppDispatch: () => AppDispatch = useDispatch;