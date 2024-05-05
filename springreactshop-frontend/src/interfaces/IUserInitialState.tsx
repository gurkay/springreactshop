import { IUserDto } from "./dtos/IUserDto";

export interface IUserInitialState {
    user: IUserDto;
    users: IUserDto[];
    loading: boolean;
    status: string;
}