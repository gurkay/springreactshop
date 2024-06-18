import { IUserResponseDto } from "../../interfaces/dtos/IUserResponseDto";

interface UserPaginationProps {
    showingInfo: string;
    userResponseDto: IUserResponseDto;
}

const UserPagination = ({ showingInfo, userResponseDto }: UserPaginationProps) => {
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
                            <a className="page-link" href="/admin/users/page/1">First</a>
                        </li>
                        <li
                            className={`${userResponseDto?.currentPage === 1 ? `page-item disabled` : `page-item`}`}
                        >
                            <a className="page-link" href={`/admin/users/page/${userResponseDto?.currentPage - 1 !== 0 ? userResponseDto?.currentPage - 1 : 1}`}>Previous</a></li>
                        {
                            userResponseDto?.totalPages &&
                            Array.from({ length: userResponseDto.totalPages }, (_, i) => i + 1).map((page: number) => {
                                return (
                                    <li
                                        className={`${userResponseDto.currentPage === page ? `page-item active` : `page-item`}`}
                                        key={page}
                                    >
                                        <a className="page-link" href={`/admin/users/page/${page}`}>
                                            {page}
                                        </a>
                                    </li>
                                );
                            })
                        }
                        <li
                            className={`${userResponseDto?.currentPage === userResponseDto?.totalPages ? `page-item disabled` : `page-item`}`}
                        >
                            <a className="page-link" href={`/admin/users/page/${userResponseDto?.currentPage + 1}`}>Next</a></li>
                        <li
                            className={`${userResponseDto?.currentPage === userResponseDto?.totalPages ? `page-item disabled` : `page-item`}`}
                        >
                            <a className="page-link" href={`/admin/users/page/${userResponseDto?.totalPages}`}>Last</a></li>
                    </ul>
                </nav>
            </div>
        </>
    );
}

export default UserPagination;