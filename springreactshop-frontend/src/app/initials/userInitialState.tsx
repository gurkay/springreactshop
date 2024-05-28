import { StatusConsts } from "../../constants/StatusConsts";
import { emptyUser } from "../../constants/emptyUser";
import { IUserInitialState } from "../../interfaces/IUserInitialState";

export const userInitialState: IUserInitialState = {
    user: emptyUser,
    users: [],
    isEmailUnique: false,
    loading: false,
    status: StatusConsts.IDLE,
    result: ""
};