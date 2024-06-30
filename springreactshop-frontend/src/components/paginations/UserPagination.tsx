import { IUserResponseDto } from "../../interfaces/dtos/IUserResponseDto";
import { useMyRoutes } from "../myRoutes/MyRoutes";

interface UserPaginationProps {
    showingInfo: string;
    userResponseDto: IUserResponseDto;
    handleUsersListSort: (page: number, sortField: string, sortDir: string) => void;
}

const UserPagination = ({ showingInfo, userResponseDto, handleUsersListSort }: UserPaginationProps) => {
    
    return (
        <>
            <div>
                <span>{showingInfo} {userResponseDto?.startCount} to {userResponseDto?.endCount} of {userResponseDto?.totalElements}</span>
            </div>

            <div className="text-center mt-2">
                <nav>
                    <ul className="pagination justify-content-center">
                        <li
                            className={`${userResponseDto?.currentPage === 1 ? `page-item disabled` : `page-item`}`}
                        >
                            <a className="page-link" href="#" onClick={() => handleUsersListSort(1, userResponseDto?.sortField, userResponseDto?.sortDir)}>First</a>
                        </li>
                        <li
                            className={`${userResponseDto?.currentPage === 1 ? `page-item disabled` : `page-item`}`}
                        >
                            <a 
                                className="page-link" 
                                href="#"
                                onClick={() => handleUsersListSort(userResponseDto?.currentPage - 1 !== 0 ? userResponseDto?.currentPage - 1 : 1, userResponseDto?.sortField, userResponseDto?.sortDir)}
                            >Previous</a></li>
                        {
                            userResponseDto?.totalPages &&
                            Array.from({ length: userResponseDto.totalPages }, (_, i) => i + 1).map((page: number) => {
                                return (
                                    <li
                                        className={`${userResponseDto.currentPage === page ? `page-item active` : `page-item`}`}
                                        key={page}
                                    >
                                        <a 
                                            className="page-link" 
                                            onClick={() => handleUsersListSort(page, userResponseDto?.sortField, userResponseDto?.sortDir)}
                                            href="#"
                                        >
                                            {page}
                                        </a>
                                    </li>
                                );
                            })
                        }
                        <li
                            className={`${userResponseDto?.currentPage === userResponseDto?.totalPages ? `page-item disabled` : `page-item`}`}
                        >
                            <a 
                                className="page-link" 
                                onClick={() => handleUsersListSort(userResponseDto?.currentPage + 1, userResponseDto?.sortField, userResponseDto?.sortDir)} 
                                href="#"
                            >Next</a></li>
                        <li
                            className={`${userResponseDto?.currentPage === userResponseDto?.totalPages ? `page-item disabled` : `page-item`}`}
                        >
                            <a 
                                className="page-link" 
                                href="#"
                                onClick={() => handleUsersListSort(userResponseDto?.totalPages, userResponseDto?.sortField, userResponseDto?.sortDir)} 
                            >Last</a></li>
                    </ul>
                </nav>
            </div>
        </>
    );
}

export default UserPagination;