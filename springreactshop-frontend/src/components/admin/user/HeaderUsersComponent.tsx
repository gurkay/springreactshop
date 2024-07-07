interface IProps {
    handleUserListFindAll: (page: number, sortField: string, sortDir: string, keyword: string) => void;
    pageNum: number;
    handleNewUser: () => void;
    handleExportToCSV: () => void;
}

const HeaderUsersComponent = ({handleUserListFindAll, pageNum, handleNewUser, handleExportToCSV}: IProps) => {
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
                <button className="btn btn-primary" onClick={handleNewUser}>Create New User</button>
                <button className="btn btn-secondary ml-2" onClick={handleExportToCSV}>Export To CSV</button>
            </div>
        </div>
    </div>
    );
}

export default HeaderUsersComponent;