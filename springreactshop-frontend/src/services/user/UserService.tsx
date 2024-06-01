import { IUserDto } from "../../interfaces/dtos/IUserDto";
import HttpService from "../HttpService";

const UserService = {

    getAllUsers: async () => {
        const response = await HttpService.getAxiosClient().get(`admin/users`);
        return response.data;
    },

    getUserById: async (id: number) => {
        const response = await HttpService.getAxiosClient().get(`admin/user/${id}`);
        return response.data;
    },

    createUser: async (userDto: IUserDto, image: any) => {
        const formData = new FormData();
        formData.append("file", image);
        await HttpService.getAxiosClient().post(`admin/user/upload/userPhoto`, formData);
        const response = await HttpService.getAxiosClient().post(`admin/user`, userDto);
        return response.data;
    },

    updateUser: async (userId: number, user: IUserDto) => {
        const response = await HttpService.getAxiosClient().put(`admin/user/${userId}`, user);
        return response.data;
    },

    deleteUser: async (userId: number) => {
        const response = await HttpService.getAxiosClient().delete(`admin/user/${userId}`);
        return response.data;
    },

    isEmailUnique: async (email: string) => {
        const response = await HttpService.getAxiosClient().post(`admin/user/isEmailUnique/${email}`);
        return response.data;
    },

    updateUserEnabledStatus: async (userId: number, enabled: boolean) => {
        const response = await HttpService.getAxiosClient().get(`admin/user/${userId}/enabled/${enabled}`);
        return response.data;
    }
}

export default UserService;