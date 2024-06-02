import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../app/store";
import { IUserDto } from "../../../../interfaces/dtos/IUserDto";
import { IRoleDto } from "../../../../interfaces/dtos/IRoleDto";

interface IProps {
    handleEditUser: (userId: number) => void;
    setSelectedUser: (user: IUserDto) => void;
    handleUpdateUserEnabledStatus: (userId: number, enabled: boolean) => void;
}

const ListUsersTable = ({ handleEditUser, setSelectedUser, handleUpdateUserEnabledStatus }: IProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const selectorUser = useSelector((state: RootState) => state.userReducer);

    return (
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
                                <td> 
                                    {
                                        user.photos === null && <img src={user.photosImagePath} alt="User" />
                                    }
                                    {
                                        user.photos && <img src={user.photosImagePath} alt="User" />
                                    }
                                    
                                </td>
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
                                        onClick={() => { user.id !== undefined && handleUpdateUserEnabledStatus(user.id,!user.enabled) }}
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
                                        data-bs-toggle="modal"
                                        data-bs-target="#deleteModal"
                                        onClick={() => setSelectedUser(user)}
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
    );
}

export default ListUsersTable;