import HttpService from "../HttpService";



const AdminService = {
    getAdminHome: async () => {
        const response = await HttpService.getAxiosClient().get(`admin/home`);
        return response.data;
    }
}

export default AdminService;