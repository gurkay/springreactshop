import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import { useEffect } from "react";
import { deleteUser, getAllUsers } from "../../../app/features/userSlice/userCreateAsyncThunk";
import { IUserDto } from "../../../interfaces/dtos/IUserDto";
import { IRoleDto } from "../../../interfaces/dtos/IRoleDto";
import { useNavigate } from "react-router-dom";
import { getAllRoles } from "../../../app/features/roleSlice/roleCreateAsyncThunk";
import { setUser } from "../../../app/features/userSlice/userSlice";
import { emptyUser } from "../../../constants/emptyUser";

const ListUsersComponent = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const selectorUser = useSelector((state: RootState) => state.userReducer);

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
                    </div>
                </div>
            </div>

            <div>
                {
                    selectorUser.user.id && selectorUser.user.id > 0
                        ? <div className="alert alert-success" role="alert">{selectorUser.user.email} Success</div> 
                        : <></>
                }
            </div>

            <div className="container">
                <table className="table table-striped table-bordered table-hover table-responsive">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Photos</th>
                            <th scope="col">E-mail</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Roles</th>
                            <th scope="col">Enabled</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            selectorUser.users && selectorUser.users.map((user: IUserDto) => (
                                <tr key={user.id}>
                                    <th scope="row">{user.id}</th>
                                    <td><span className="bi bi-image"></span></td>
                                    <td>{user.email}</td>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>
                                        {
                                            user.roles.map((role: IRoleDto) => (<span key={role.id}>{role.name} </span>))
                                        }
                                    </td>
                                    <td>
                                        <button
                                            className={(user.enabled) ? "btn btn-outline-success" : "btn btn-outline-danger"}
                                            onClick={() => user.id !== undefined && handleEditUser(user.id)}
                                        ><i className={(user.enabled) ? "bi bi-check-circle" : "bi bi-x-circle"}></i></button>
                                    </td>
                                    <td className="text-center">
                                        <button
                                            className="btn btn-info"
                                            title="Edit user"
                                            onClick={() => user.id !== undefined && handleEditUser(user.id)}
                                        ><i className="bi bi-pencil-square"></i></button>

                                        <button
                                            className="btn btn-danger"
                                            title="Delete user"
                                            onClick={() => user.id !== undefined && handleDeleteUser(user.id)}
                                            style={{ marginLeft: '10px' }}
                                        ><i className="bi bi-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ListUsersComponent;