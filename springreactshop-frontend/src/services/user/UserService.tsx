import HttpService from "../HttpService";

const UserService = {

    getAllUsers: async () => {
        const response = await HttpService.getAxiosClient().get(`admin/users`);
        return response.data;
    }
}

export default UserService;