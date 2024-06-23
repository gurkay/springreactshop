import { Route, Routes } from "react-router-dom";
import AdminHomeComponent from "../admin/home/AdminHomeComponent";
import ListUsersComponent from "../admin/user/ListUsersComponent";
import NewUserComponent from "../admin/user/NewUserComponent";

const MyRoutes = () => {
    return (
        <Routes>
            <Route path="/home" element={<AdminHomeComponent />} />
            <Route path="/admin/users" element={<ListUsersComponent />} />
            <Route path="/admin/users/page/:pageNum" element={<ListUsersComponent />} />
            <Route path="/admin/newUser" element={<NewUserComponent />} />
            <Route path="/admin/editUser/:userId" element={<NewUserComponent />} />
        </Routes>
    );
}

export default MyRoutes;