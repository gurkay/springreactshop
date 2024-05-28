
import { IUserDto } from "./dtos/IUserDto";

export interface IUserInitialState {
    user: IUserDto;
    users: IUserDto[];
    isEmailUnique: boolean;
    loading: boolean;
    status: string;
    result: string;
}