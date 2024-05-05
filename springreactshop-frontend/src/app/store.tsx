import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import adminReducer from './features/adminSlice/adminSlice';
import userReducer from './features/userSlice/userSlice';

export const store = configureStore({
  reducer: {
    adminReducer: adminReducer,
    userReducer: userReducer,
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