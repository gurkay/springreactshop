import { IRoleDto } from "../../interfaces/dtos/IRoleDto";
import HttpService from "../HttpService";

const RoleService = {
    getAllRoles: async () => {
        const response = await HttpService.getAxiosClient().get(`admin/roles`);
        return response.data;
    },
    
    getRoleById: async (id: number) => {
        const response = await HttpService.getAxiosClient().get(`admin/role/${id}`);
        return response.data;
    },

    createRole: async (role: IRoleDto) => {
        const response = await HttpService.getAxiosClient().post(`admin/role`, role);
        return response.data;
    },

    updateRole: async (roleId: number, role: IRoleDto) => {
        console.log(role);
        const response = await HttpService.getAxiosClient().put(`admin/role/${roleId}`, role);
        return response.data;
    },

    deleteRole: async (roleId: number) => {
        const response = await HttpService.getAxiosClient().delete(`admin/role/${roleId}`);
        return response.data;
    },
}

export default RoleService;