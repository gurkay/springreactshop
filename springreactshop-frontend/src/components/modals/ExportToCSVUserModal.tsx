import { Button, Modal } from "react-bootstrap";

interface IProps {
    handleExportFiles: (fileType: string) => void;
    show: boolean;
    handleClose: () => void;
    fileType: string;
}

const ExportToCSVUserModal = ({ handleExportFiles, show, handleClose, fileType }: IProps) => {
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Export</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to export file {fileType}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button className="btn btn-primary" onClick={() => handleExportFiles(fileType)}>
                        Export
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ExportToCSVUserModal;