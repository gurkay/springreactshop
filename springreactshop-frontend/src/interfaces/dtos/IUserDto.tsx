import { IRoleDto } from "./IRoleDto";

export interface IUserDto {
    id: number,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    photos: string,
    enabled: boolean,
    roles: IRoleDto[],
}