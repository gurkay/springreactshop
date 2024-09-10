import { StatusConsts } from "../../constants/StatusConsts";
import { emptyUser } from "../../constants/emptyUser";
import { IUserInitialState } from "../../interfaces/IUserInitialState";

export const userInitialState: IUserInitialState = {
    user: emptyUser,
    users: [],
    isEmailUnique: false,
    loading: false,
    status: StatusConsts.IDLE,
    responseMessage: "",
    userResponseDto: {
        userDto: emptyUser,
        message: "",
        users: [],
        pageNum: 0,
        totalElements: 0,
        totalPages: 0,
        startCount: 0,
        endCount: 0,
        currentPage: 0,
        sortField: "",
        sortDir: "",
        keyword: "",
    },
    exportUserToCSV: "",
    exportUserToExcel: "",
    exportUserToPdf: "",
};