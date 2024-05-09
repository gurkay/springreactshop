import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import { useEffect } from "react";
import { getAllUsers } from "../../../app/features/userSlice/userCreateAsyncThunk";
import { IUserDto } from "../../../interfaces/dtos/IUserDto";
import { IRoleDto } from "../../../interfaces/dtos/IRoleDto";
import { useNavigate } from "react-router-dom";

const ListUsersComponent = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const selectorUser = useSelector((state: RootState) => state.userReducer);

    function fetchUsers() {
        dispatch(getAllUsers());
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    function handleNewUser() {
        navigate('/admin/newUser');
    }

    return (
        <div className="card mt-2">
            <div className="container mb-2">
                <div className="row">
                    <h4>Manage Users</h4>
                    <div className="col">
                        <button className="btn btn-primary" onClick={handleNewUser}>New User</button>
                    </div>
                    <div className="col">
                        <button className="btn btn-primary" onClick={handleNewUser}>New User</button>
                    </div>
                </div>
            </div>
            <div className="container">
                <table className="table table-striped table-bordered table-hover table-responsive">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Photos</th>
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
                                    <td>{user.photos}</td>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{
                                        user.roles.map((role: IRoleDto) => (<span key={role.id}>{role.name} </span>))
                                    }
                                    </td>
                                    <td>{(user.enabled) ? "true" : "false"}</td>
                                    <td className="text-center">
                                        <button
                                            className="btn btn-info"
                                            onClick={() => { }}
                                        >Edit</button>

                                        <button
                                            className="btn btn-danger"
                                            onClick={() => { }}
                                            style={{ marginLeft: '10px' }}
                                        >Delete
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