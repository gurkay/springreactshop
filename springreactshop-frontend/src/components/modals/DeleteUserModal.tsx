import { Button, Modal } from "react-bootstrap";
import { IUserDto } from "../../interfaces/dtos/IUserDto";

interface IProps {
    selectedUser: IUserDto;
    handleDeleteUser: (userId: number) => void;
    show: boolean;
    handleClose: () => void;
}

const DeleteUserModal = ({ selectedUser, handleDeleteUser, show, handleClose }: IProps) => {
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete {selectedUser.email}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedUser.id !== undefined && <p>Are you sure you want to delete user with id: {selectedUser.id}</p>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button className="btn btn-danger" onClick={() => {
                        if (selectedUser.id !== undefined) {
                            console.log(selectedUser);
                            handleDeleteUser(selectedUser.id);
                        }
                    }}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DeleteUserModal;