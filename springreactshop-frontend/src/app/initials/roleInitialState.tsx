import { StatusConsts } from "../../constants/StatusConsts";
import { emptyRole } from "../../constants/emptyRole";
import { IRoleInitialState } from "../../interfaces/IRoleInitialState";

export const roleInitialState: IRoleInitialState = {
    role: emptyRole,
    roles: [],
    loading: false,
    status: StatusConsts.IDLE
};