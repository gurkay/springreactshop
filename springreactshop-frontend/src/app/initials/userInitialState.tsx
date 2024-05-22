import { StatusConsts } from "../../constants/StatusConsts";
import { emptyUser } from "../../constants/emptyUser";
import { IUserInitialState } from "../../interfaces/IUserInitialState";

export const userInitialState: IUserInitialState = {
    user: emptyUser,
    users: [],
    isEmailUnique: true,
    loading: false,
    status: StatusConsts.IDLE
};