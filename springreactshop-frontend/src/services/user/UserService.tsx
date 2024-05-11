import { IUserDto, IUserDtoWithoutId } from "../../interfaces/dtos/IUserDto";
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

    createUser: async (user: IUserDto) => {
        const response = await HttpService.getAxiosClient().post(`admin/user`, user);
        return response.data;
    },

    updateUser: async (userId: number, user: IUserDto) => {
        console.log(userId);
        console.log(user);
        const response = await HttpService.getAxiosClient().put(`admin/user/${userId}`, user);
        return response.data;
    },

    deleteUser: async (userId: number) => {
        const response = await HttpService.getAxiosClient().delete(`admin/user/${userId}`);
        return response.data;
    }
}

export default UserService;