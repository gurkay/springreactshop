import { StatusConsts } from "../../constants/StatusConsts";
import { IAdminInitialState } from "../../interfaces/IAdminInitialState";

export const adminInitialState: IAdminInitialState = {
    admin: {result: ''},
    loading: false,
    status: StatusConsts.IDLE
}