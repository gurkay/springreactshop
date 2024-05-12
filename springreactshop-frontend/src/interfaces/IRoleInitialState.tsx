import { IRoleDto } from "./dtos/IRoleDto";

export interface IRoleInitialState {
    role: IRoleDto;
    roles: IRoleDto[];
    loading: boolean;
    status: string;
}