import { IAdminDto } from "./dtos/IAdminDto";

export interface IAdminInitialState {
    admin:IAdminDto;
    loading: boolean;
    status: string;
}