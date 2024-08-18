import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import { useEffect, useState } from "react";
import { deleteUser, exportUsersToCSV, exportUsersToExcel, listByPage, updateUserEnabledStatus } from "../../../app/features/userSlice/userCreateAsyncThunk";
import { IUserDto } from "../../../interfaces/dtos/IUserDto";
import { useNavigate, useParams } from "react-router-dom";
import { getAllRoles } from "../../../app/features/roleSlice/roleCreateAsyncThunk";
import { setResponseMessage, setUser } from "../../../app/features/userSlice/userSlice";
import { emptyUser } from "../../../constants/emptyUser";
import DeleteUserModal from "../../modals/DeleteUserModal";
import ListUsersTable from "./utility/ListUsersTable";
import { StatusConsts } from "../../../constants/StatusConsts";
import UserPagination from "../../paginations/UserPagination";
import HeaderUsersComponent from "./HeaderUsersComponent";

const ListUsersComponent = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const selectorUser = useSelector((state: RootState) => state.userReducer);

    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<IUserDto>(emptyUser);
    const [exportCSV, setExportCSV] = useState<any>();
    const { pageNum } = useParams();

    useEffect(() => {
        console.log("ListUsersComponent.tsx: pageNum: ", pageNum);
        fetchUsers(pageNum ? parseInt(pageNum) : 1);
        fetchRoles();
    }, []);

    function fetchUsers(pageNum: number) {

        handleUsersListSort(pageNum, "id", "asc");
    }

    function handleUsersListSort(pageNum: number, sortField: string, sortDir: string, keyword: string = '') {
        const userListPath = `admin/users/page/${pageNum}?sortField=${sortField}&sortDir=${sortDir}&keyword=${keyword}`;
        console.log(userListPath);
        dispatch(listByPage(userListPath));
    }

    function handleUserListFindAll(pageNum: number, sortField: string, sortDir: string, keyword: string) {
        const userListFindAllPath = `admin/users/page/${pageNum}?sortField=${sortField}&sortDir=${sortDir}&keyword=${keyword}`;
        console.log(userListFindAllPath);
        dispatch(listByPage(userListFindAllPath));
    }

    function fetchRoles() {
        dispatch(getAllRoles());
    }

    function handleNewUser() {
        dispatch(setUser(emptyUser));
        navigate('/admin/newUser');
    }

    function handleEditUser(userId: number) {
        navigate(`/admin/editUser/${userId}`);
    }

    function handleUpdateUserEnabledStatus(userId: number, enabled: boolean) {
        dispatch(updateUserEnabledStatus({ userId, enabled })).then((response: any) => {
            dispatch(setResponseMessage(response.payload.message));
            fetchUsers(pageNum ? parseInt(pageNum) : 1);
            navigate('/admin/users');
        }).catch((error: any) => {
            console.log(error);
        });
    }

    function handleShowDeleteModal() {
        setShowDeleteModal(!showDeleteModal);
    }

    function handleDeleteUser(userId: number) {
        dispatch(deleteUser(userId))
            .then((response: string) => {
                console.log(response);
                fetchUsers(pageNum ? parseInt(pageNum) : 1);
                navigate('/admin/users');
            }).catch((error: any) => {
                console.log(error);
            });
    }

    function handleExportToCSV() {
        const path = `admin/users/export/csv`;
        dispatch(exportUsersToCSV(path));

        setExportCSV(selectorUser.exportUserToCSV);

        console.log('useStat CSV: ',exportCSV);
        console.log(selectorUser.exportUserToCSV);

        const jsonData = new Blob([JSON.stringify(selectorUser.exportUserToCSV)], {type: 'application/json'});
        const jsonURL = window.URL.createObjectURL(jsonData);
        const link = document.createElement('a');
        link.href = jsonURL;
        link.download = `${Date.now()}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    function handleExportToExcel() {
        const path = `admin/users/export/excel`;
        dispatch(exportUsersToExcel(path));

        if(selectorUser.exportUserToExcel) {
            console.log('useStat Excel: ',selectorUser.exportUserToExcel);
            // const workbook = new ExcelJS.Workbook();
            // const worksheet = workbook.addWorksheet('Users');


            // const worksheetData = selectorUser.exportUserToExcel;
            // var FileSaver = require('file-saver');

            // const blob = new Blob([worksheetData], {type: 'application/octet-stream'});
            // FileSaver.saveAs(blob, `${Date.now()}.xlsx`);
              
        }
    }

    return (
        <div className="card mt-2">
            <HeaderUsersComponent 
                handleUserListFindAll={handleUserListFindAll}
                pageNum={pageNum ? parseInt(pageNum) : 1}
                handleNewUser={handleNewUser}
                handleExportToCSV={handleExportToCSV}
                handleExportToExcel={handleExportToExcel}
            />
            {selectorUser.status === StatusConsts.LOADING && <div className="text-center mt-2"><i className="fas fa-spinner fa-spin fa-2x"></i></div>}
            {selectorUser.userResponseDto?.message && <div className="alert alert-success" role="alert">{selectorUser.userResponseDto.message}</div>}
            <ListUsersTable
                userResponseDto={selectorUser?.userResponseDto}
                handleEditUser={handleEditUser}
                setSelectedUser={setSelectedUser}
                handleUpdateUserEnabledStatus={handleUpdateUserEnabledStatus}
                handleUsersListSort={handleUsersListSort}
            />
            <UserPagination
                showingInfo="Showing users #"
                userResponseDto={selectorUser.userResponseDto}
                handleUsersListSort={handleUsersListSort}
            />
            {showDeleteModal && <DeleteUserModal selectedUser={selectedUser} handleDeleteUser={handleDeleteUser} />}

        </div>
    );
}

export default ListUsersComponent;