interface IProps {
    handleUserListFindAll: (page: number, sortField: string, sortDir: string, keyword: string) => void;
    pageNum: number;
    handleNewUser: () => void;
    handleExportToCSV: () => void;
    handleExportToExcel: () => void;
}

const HeaderUsersComponent = ({handleUserListFindAll, pageNum, handleNewUser, handleExportToCSV, handleExportToExcel}: IProps) => {
    return(
        <div className="container mb-2">
        <div className="row">
            <h4>Manage Users</h4>
            <div className="col">
                <div className="input-group mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-default">Filter :</span>
                    <input 
                        type="text" 
                        className="form-control" 
                        aria-label="Sizing example input" 
                        aria-describedby="inputGroup-sizing-default" 
                        onChange={(event) => handleUserListFindAll(pageNum, "id", "asc", event.target.value)}
                    />
                </div>
            </div>
            <div className="col">
                <button className="btn btn-link" onClick={handleNewUser} style={{textDecoration: 'none'}}>Create New User</button>
                <button className="btn btn-link" onClick={handleExportToCSV} style={{textDecoration: 'none'}}>Export To CSV</button>
                <button className="btn btn-link" onClick={handleExportToExcel} style={{textDecoration: 'none'}}>Export To Excel</button>
            </div>
        </div>
    </div>
    );
}

export default HeaderUsersComponent;