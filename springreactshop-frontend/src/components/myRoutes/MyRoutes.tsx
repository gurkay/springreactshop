import { Route, Routes } from "react-router-dom";
import AdminHomeComponent from "../admin/home/AdminHomeComponent";
import ListUsersComponent from "../admin/user/ListUsersComponent";
import NewUserComponent from "../admin/user/NewUserComponent";

const MyRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<ListUsersComponent />} />
            <Route path="/home" element={<AdminHomeComponent />} />
            <Route path="/admin/users" element={<ListUsersComponent />} />
            <Route path="/admin/newUser/:userId" element={<NewUserComponent />} />
        </Routes>
    );
}

export default MyRoutes;