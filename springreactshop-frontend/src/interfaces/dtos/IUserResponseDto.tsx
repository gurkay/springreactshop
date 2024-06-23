import { IUserDto } from "./IUserDto";

export interface IUserResponseDto {
    userDto?: IUserDto,
    message: string,
    users: IUserDto[],
    pageNum: number,
    totalElements: number,
    totalPages: number,
    startCount: number,
    endCount: number,
    currentPage: number,
    sortField: string,
    sortDir: string,
}