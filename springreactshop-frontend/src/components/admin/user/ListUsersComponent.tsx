import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import { useEffect, useState } from "react";
import { deleteUser, getAllUsers, updateUserEnabledStatus } from "../../../app/features/userSlice/userCreateAsyncThunk";
import { IUserDto } from "../../../interfaces/dtos/IUserDto";
import { useNavigate } from "react-router-dom";
import { getAllRoles } from "../../../app/features/roleSlice/roleCreateAsyncThunk";
import { setResponseMessage, setUser } from "../../../app/features/userSlice/userSlice";
import { emptyUser } from "../../../constants/emptyUser";
import DeleteUserModal from "../../modals/DeleteUserModal";
import ListUsersTable from "./utility/ListUsersTable";

const ListUsersComponent = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const selectorUser = useSelector((state: RootState) => state.userReducer);

    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<IUserDto>(emptyUser);

    useEffect(() => {
        fetchUsers();
        fetchRoles();
    }, []);

    function fetchUsers() {
        dispatch(getAllUsers());
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
        dispatch(updateUserEnabledStatus({ userId: Number(userId), enabled: enabled })).then((response: any) => {
            dispatch(setResponseMessage(response.payload));
            fetchUsers();
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
                fetchUsers();
                navigate('/admin/users');
            }).catch((error: any) => {
                console.log(error);
            });
    }

    return (
        <div className="card mt-2">
            <div className="container mb-2">
                <div className="row">
                    <h4>Manage Users</h4>
                    <div className="col">
                        <button className="btn btn-primary" onClick={handleNewUser}>Create New User</button>
                        <button className="btn btn-secondary ml-2" onClick={handleShowDeleteModal}>Delete User</button>
                    </div>
                </div>
            </div>

            {
                selectorUser.responseMessage && <div className="alert alert-success" role="alert">{selectorUser.responseMessage}</div>
            }

            <ListUsersTable handleEditUser={handleEditUser} setSelectedUser={setSelectedUser} handleUpdateUserEnabledStatus={handleUpdateUserEnabledStatus} />

            {
                showDeleteModal || showDeleteModal !== undefined && <DeleteUserModal selectedUser={selectedUser} handleDeleteUser={handleDeleteUser} />
            }

        </div>
    );
}

export default ListUsersComponent;