import { listByPage } from "../../app/features/userSlice/userCreateAsyncThunk";
import { AppDispatch } from "../../app/store";
import { useDispatch } from "react-redux";
import { createContext, useContext } from "react";

const MyContext = createContext({handleListSort: (pageNum: number, sortField: string, sortDir: string) => {}});

export const MyRoutes = ({children}: any) => {
    const dispatch = useDispatch<AppDispatch>();

    const handleListSort = (pageNum: number, sortField: string, sortDir: string) => {
        const userListPath = `admin/users/page/${pageNum}?sortField=${sortField}&sortDir=${sortDir}`;
        console.log(userListPath);
        dispatch(listByPage(userListPath));
    }

    return (
        <MyContext.Provider value={{handleListSort}}>
            {children}
        </MyContext.Provider>
    );
}

export const useMyRoutes = () => useContext(MyContext);