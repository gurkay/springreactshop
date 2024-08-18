import { IUserDto } from "./dtos/IUserDto";
import { IUserResponseDto } from "./dtos/IUserResponseDto";

export interface IUserInitialState {
    user: IUserDto;
    users: IUserDto[];
    isEmailUnique: boolean;
    loading: boolean;
    status: string;
    responseMessage: string;
    userResponseDto: IUserResponseDto;
    exportUserToCSV: string;
    exportUserToExcel: string;
}