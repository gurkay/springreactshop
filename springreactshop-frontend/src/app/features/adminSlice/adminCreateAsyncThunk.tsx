import { createAsyncThunk } from "@reduxjs/toolkit";

import AdminService from "../../../services/admin/AdminService";

export const getAdminHome: any = createAsyncThunk('getAdminHome', async () => {
    const response = await AdminService.getAdminHome();
    return Promise.resolve(response);
});