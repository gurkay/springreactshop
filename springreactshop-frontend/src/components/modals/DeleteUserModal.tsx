import { IUserDto } from "../../interfaces/dtos/IUserDto";

interface IProps {
    selectedUser: IUserDto;
    handleDeleteUser: (userId: number) => void;
}

const DeleteUserModal = ({selectedUser, handleDeleteUser}: IProps) => {
    return (
        <div className="modal fade" id="deleteModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true" >
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="deleteModalLabel">Delete {selectedUser.email}</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    {selectedUser.id !== undefined && <p>Are you sure you want to delete user with id: {selectedUser.id}</p>}
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => {
                        if (selectedUser.id !== undefined) {
                            console.log(selectedUser);
                            handleDeleteUser(selectedUser.id);
                        }
                    }}>Delete</button>
                </div>
            </div>
        </div>
    </div>
    );
}

export default DeleteUserModal;