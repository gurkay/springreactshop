import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ImportAll } from "../../../utils/ImportAll";
import { IUserDto } from "../../../interfaces/dtos/IUserDto";
import { IData } from "../../../interfaces/IData";
import jsPDF from "jspdf";

const ListUsersComponent = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const selectorUser = useSelector((state: RootState) => state.userReducer);

    const [selectedUser, setSelectedUser] = useState<IUserDto>(ImportAll.emptyUser);
    const { pageNum } = useParams();

    const [showDeleteUserModal, setShowDeleteUserModal] = useState<boolean>(false);
    const [showExportToCSVUserModal, setShowExportToCSVUserModal] = useState<boolean>(false);
    const [fileType, setFileType] = useState<string>("csv");

    useEffect(() => {

    }, [selectorUser.userResponseDto.users]);

    useEffect(() => {
        fetchUsers(pageNum ? parseInt(pageNum) : 1);
        fetchRoles();
    }, []);

    const handleCloseDeleteUserModal = () => setShowDeleteUserModal(false);
    const handleShowDeleteUserModal = () => setShowDeleteUserModal(true);
    const handleCloseExportToUserModal = () => setShowExportToCSVUserModal(false);
    const handleShowExportToUserModal = () => setShowExportToCSVUserModal(true);

    function fetchUsers(pageNum: number) {
        console.log(pageNum);
        handleUsersListSort(pageNum, "id", "asc");
    }

    function handleUsersListSort(pageNum: number, sortField: string, sortDir: string, keyword: string = '') {
        const userListPath = `admin/users/page/${pageNum}?sortField=${sortField}&sortDir=${sortDir}&keyword=${keyword}`;
        dispatch(ImportAll.listByPage(userListPath));
    }

    function handleUserListFindAll(pageNum: number, sortField: string, sortDir: string, keyword: string) {
        const userListFindAllPath = `admin/users/page/${pageNum}?sortField=${sortField}&sortDir=${sortDir}&keyword=${keyword}`;
        dispatch(ImportAll.listByPage(userListFindAllPath));
    }

    function fetchRoles() {
        dispatch(ImportAll.getAllRoles());
    }

    function handleNewUser() {
        dispatch(ImportAll.setUser(ImportAll.emptyUser));
        navigate('/admin/newUser');
    }

    function handleEditUser(userId: number) {
        navigate(`/admin/editUser/${userId}`);
    }

    function handleUpdateUserEnabledStatus(userId: number, enabled: boolean) {
        dispatch(ImportAll.updateUserEnabledStatus({ userId, enabled })).then((response: any) => {
            dispatch(ImportAll.setResponseMessage(response.payload.message));
            fetchUsers(pageNum ? parseInt(pageNum) : 1);
            navigate('/admin/users');
        }).catch((error: any) => {
            console.log(error);
        });
    }

    const handleShowDeleteModal = (userDto: IUserDto) => {
        handleShowDeleteUserModal();
        setSelectedUser(userDto);
    }

    const handleDeleteUser = async (userId: number) => {
        handleCloseDeleteUserModal();
        await dispatch(ImportAll.deleteUser(userId));

        fetchUsers(pageNum ? parseInt(pageNum) : 1);
    }

    const handleExportFiles = async (fileType: string) => {
        let fileName: string;
        const workbook = new ImportAll.ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Users');
        worksheet.columns = [
            { header: 'ID', key: 'id', width: 10 },
            { header: 'Email', key: 'email', width: 30 },
            { header: 'FirstName', key: 'firstName', width: 30 },
            { header: 'LastName', key: 'lastName', width: 30 },
            { header: 'Photos', key: 'photos', width: 30 },
            { header: 'PhotosImagePath', key: 'photosImagePath', width: 30 },
            { header: 'Roles', key: 'roles', width: 30 },
        ];
        let jsonData: IData[] = [];
        switch (fileType) {
            case 'excel':
                fileName = `${Date.now()}.xlsx`;
                jsonData = JSON.parse(JSON.stringify(selectorUser.exportUserToExcel));
                if (jsonData.length > 0) {
                    jsonData.forEach((data) => {
                        worksheet.addRow(data);
                    });
                    // Excel dosyasını oluştur ve kaydet
                    const buffer = await workbook.xlsx.writeBuffer();
                    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                    // Dosyayı indir
                    ImportAll.saveAs(blob, `${Date.now()}.xlsx`);
                }
                handleCloseExportToUserModal();
                break;
            case 'csv':
                fileName = `${Date.now()}.csv`;
                jsonData = JSON.parse(JSON.stringify(selectorUser.exportUserToCSV));
                if (jsonData.length > 0) {
                    jsonData.forEach((data) => {
                        worksheet.addRow(data);
                    });
                    // CSV dosyasını oluştur ve kaydet
                    const buffer = await workbook.csv.writeBuffer();
                    const blob = new Blob([buffer], { type: 'text/csv;charset=utf-8;' });
                    // Dosyayı indir
                    ImportAll.saveAs(blob, fileName);
                }
                handleCloseExportToUserModal();
                break;
            case 'pdf':
                fileName = `${Date.now()}.pdf`;
                jsonData = JSON.parse(JSON.stringify(selectorUser.exportUserToPdf));
                // Yeni bir jsPDF nesnesi oluştur
                const doc = new jsPDF();
                // Başlık ekle
                doc.setFontSize(14);
                doc.text('JSON Verileri PDF', 10, 10);
                if (jsonData.length > 0) {
                    let yOffset = 20; // Başlıktan itibaren yazılacak ilk satırın y eksenindeki konumu
                    jsonData.forEach((data) => {
                        doc.setFontSize(12);
                        doc.text(`ID:${data.id}, Email:${data.email}, FirstName:${data.firstName}, LastName:${data.lastName}, Roles:${data.roles}`, 10, yOffset);
                        yOffset += 10; // Her satır için aşağı kaydır
                    });
                    // CSV dosyasını oluştur ve kaydet
                    const buffer = await doc.output('blob');
                    const blob = new Blob([buffer], { type: 'text/pdf;charset=utf-8;' });
                    // Dosyayı indir
                    ImportAll.saveAs(blob, fileName);
                }
                handleCloseExportToUserModal();
                break;
        }
    }

    function handleExportToCSV() {
        const path = `admin/users/export/csv`;
        dispatch(ImportAll.exportUsersToCSV(path));
        setFileType('csv');
        handleShowExportToUserModal();
    }

    async function handleExportToExcel() {
        const path = `admin/users/export/excel`;
        dispatch(ImportAll.exportUsersToExcel(path));
        setFileType('excel');
        handleShowExportToUserModal();
    }

    async function handleExportToPdf() {
        const path = `admin/users/export/pdf`;
        dispatch(ImportAll.exportUsersToPdf(path));
        setFileType('pdf');
        handleShowExportToUserModal();
    }

    return (
        <div className="card mt-2">
            <ImportAll.HeaderUsersComponent
                handleUserListFindAll={handleUserListFindAll}
                pageNum={pageNum ? parseInt(pageNum) : 1}
                handleNewUser={handleNewUser}
                handleExportToCSV={handleExportToCSV}
                handleExportToExcel={handleExportToExcel}
                handleExportToPdf={handleExportToPdf}
            />
            {selectorUser.status === ImportAll.StatusConsts.LOADING && <div className="text-center mt-2"><i className="fas fa-spinner fa-spin fa-2x"></i></div>}
            {selectorUser.userResponseDto?.message && <div className="alert alert-success" role="alert">{selectorUser.userResponseDto.message}</div>}
            <ImportAll.ListUsersTable
                userResponseDto={selectorUser?.userResponseDto}
                handleEditUser={handleEditUser}
                handleShowDeleteModal={handleShowDeleteModal}
                handleUpdateUserEnabledStatus={handleUpdateUserEnabledStatus}
                handleUsersListSort={handleUsersListSort}
            />
            <ImportAll.UserPagination
                showingInfo="Showing users #"
                userResponseDto={selectorUser.userResponseDto}
                handleUsersListSort={handleUsersListSort}
            />
            <ImportAll.DeleteUserModal
                selectedUser={selectedUser}
                handleDeleteUser={handleDeleteUser}
                show={showDeleteUserModal}
                handleClose={handleCloseDeleteUserModal}
            />
            <ImportAll.ExportToCSVUserModal
                handleExportFiles={handleExportFiles}
                show={showExportToCSVUserModal}
                handleClose={handleCloseExportToUserModal}
                fileType={fileType}
            />
        </div>
    );
}

export default ListUsersComponent;