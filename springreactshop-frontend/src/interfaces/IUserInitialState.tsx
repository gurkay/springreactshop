export interface IUserDto {
    id: number,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    photos: string,
    enabled: boolean,
    roles: string[],
}

export interface IUserInitialState {
    user: IUserDto;
    users: IUserDto[];
    loading: boolean;
    status: string;
}