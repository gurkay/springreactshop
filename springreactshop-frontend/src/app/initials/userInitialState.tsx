import { StatusConsts } from "../../constants/StatusConsts";
import { emptyUser } from "../../constants/emptyUser";
import { IUserInitialStat } from "../../interfaces/IUserInitialState";

export const userInitialState: IUserInitialStat = {
    user: emptyUser,
    users: [],
    loading: false,
    status: StatusConsts.IDLE
};