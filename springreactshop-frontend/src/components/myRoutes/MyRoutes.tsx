import { Route, Routes } from "react-router-dom";
import AdminHomeComponent from "../admin/home/AdminHomeComponent";
import ListUsersComponent from "../admin/user/ListUsersComponent";

const MyRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<ListUsersComponent />} />
            <Route path="/home" element={<AdminHomeComponent />} />
            <Route path="/users" element={<ListUsersComponent />} />
        </Routes>
    );
}

export default MyRoutes;