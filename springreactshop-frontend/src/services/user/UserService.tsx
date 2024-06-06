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
        const formData = setFormData(userDto, image);
        const response = await HttpService.getAxiosClient().post(`admin/user`, formData);
        console.log(response);
        return response.data;
    },

    updateUser: async (userId: number, userDto: IUserDto, image: File) => {
        const formData = setFormData(userDto, image);
        const response = await HttpService.getAxiosClient().put(`admin/user/${userId}`, formData);
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

function setFormData(userDto: IUserDto, image: any) {
    const formData = new FormData();
    formData.append("userDto", JSON.stringify(userDto));
    formData.append("file", image);
    return formData;
}
