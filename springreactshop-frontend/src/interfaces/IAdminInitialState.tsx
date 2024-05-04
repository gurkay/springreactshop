import { IAdminDto } from "./IAdminDto";

export interface IAdminInitialState {
    admin:IAdminDto;
    loading: boolean;
    status: string;
}