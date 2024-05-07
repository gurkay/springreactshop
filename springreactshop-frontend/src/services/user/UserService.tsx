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
}

export default UserService;