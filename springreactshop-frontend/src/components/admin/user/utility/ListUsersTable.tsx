import { IUserDto } from "../../../../interfaces/dtos/IUserDto";
import { IRoleDto } from "../../../../interfaces/dtos/IRoleDto";
import { IUserResponseDto } from "../../../../interfaces/dtos/IUserResponseDto";

interface IProps {
    userResponseDto: IUserResponseDto;
    handleEditUser: (userId: number) => void;
    setSelectedUser: (user: IUserDto) => void;
    handleUpdateUserEnabledStatus: (userId: number, enabled: boolean) => void;
    handleUsersListSort: (page: number, sortField: string, sortDir: string, keyword: string) => void;
}

const ListUsersTable = ({ userResponseDto, handleEditUser, setSelectedUser, handleUpdateUserEnabledStatus, handleUsersListSort }: IProps) => {

    return (
        <div className="container">
            <table className="table table-striped table-bordered table-hover table-responsive">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">
                            {
                                <a
                                    href="#"
                                    className="text-decoration-none"
                                    onClick={
                                        () => handleUsersListSort(
                                                userResponseDto.currentPage, 
                                                "id", 
                                                userResponseDto?.sortDir === 'asc' ? 'desc' : 'asc',
                                                userResponseDto?.keyword !== '' ? userResponseDto?.keyword : ''
                                            )
                                    }
                                >
                                    Id 
                                    <i className={userResponseDto?.sortField === "id" 
                                                    ? userResponseDto?.sortDir === 'asc' 
                                                        ? "bi bi-caret-up-fill" 
                                                        : "bi bi-caret-down-fill" 
                                                    : ""}>
                                    </i>
                                </a>
                            }
                        </th>
                        <th scope="col">Photos</th>
                        <th scope="col">
                            {
                                <a
                                    href="#"
                                    className="text-decoration-none"
                                    onClick={() => handleUsersListSort(userResponseDto.currentPage, "email", userResponseDto?.sortDir === 'asc' ? 'desc' : 'asc',
                                        userResponseDto?.keyword !== '' ? userResponseDto?.keyword : '')}
                                >
                                    E-mail
                                    <i className={userResponseDto?.sortField === "email" 
                                                    ? userResponseDto?.sortDir === 'asc' 
                                                        ? "bi bi-caret-up-fill" 
                                                        : "bi bi-caret-down-fill" 
                                                    : ""}>
                                    </i>
                                </a>
                            }
                        </th>
                        <th scope="col">
                            {
                                <a
                                    href="#"
                                    className="text-decoration-none"
                                    onClick={() => handleUsersListSort(userResponseDto.currentPage, "firstName", userResponseDto?.sortDir === 'asc' ? 'desc' : 'asc',
                                        userResponseDto?.keyword !== '' ? userResponseDto?.keyword : '')}
                                >
                                    First Name 
                                    <i className={userResponseDto?.sortField === "firstName" 
                                                    ? userResponseDto?.sortDir === 'asc' 
                                                        ? "bi bi-caret-up-fill" 
                                                        : "bi bi-caret-down-fill" 
                                                    : ""}>
                                    </i>
                                </a>
                            }
                        </th>
                        <th scope="col">
                            {
                                <a  
                                    href="#"
                                    className="text-decoration-none"
                                    onClick={() => handleUsersListSort(userResponseDto.currentPage, "lastName", userResponseDto?.sortDir === 'asc' ? 'desc' : 'asc',
                                        userResponseDto?.keyword !== '' ? userResponseDto?.keyword : '')}
                                >
                                    Last Name
                                    <i className={userResponseDto?.sortField === "lastName" 
                                                    ? userResponseDto?.sortDir === 'asc' 
                                                        ? "bi bi-caret-up-fill" 
                                                        : "bi bi-caret-down-fill" 
                                                    : ""}>
                                    </i>
                                </a>
                            }
                        </th>
                        <th scope="col">Roles</th>
                        <th scope="col">Enabled</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        userResponseDto?.users && userResponseDto?.users.map((user: IUserDto) => (
                            <tr key={user.id}>
                                <th scope="row">{user.id}</th>
                                <td>
                                    {
                                        user.photos === null && <img src={user.photosImagePath} alt="User" />
                                    }
                                    {
                                        user.photos && <img src={user.photosImagePath} alt="User" style={{ width: "100px" }} />
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
                                        onClick={() => { user.id !== undefined && handleUpdateUserEnabledStatus(user.id, !user.enabled) }}
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