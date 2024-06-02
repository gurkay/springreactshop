import { IUserDto } from "./IUserDto";

export interface IUserResponseDto {
    userDto?: IUserDto,
    message: string,
}