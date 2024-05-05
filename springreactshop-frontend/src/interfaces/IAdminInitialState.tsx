export interface IAdminDto {
    result: string;
}

export interface IAdminInitialState {
    admin:IAdminDto;
    loading: boolean;
    status: string;
}