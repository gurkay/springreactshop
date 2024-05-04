import { Route, Routes } from "react-router-dom";
import AdminHomeComponent from "../admin/home/AdminHomeComponent";

const MyRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<AdminHomeComponent />} />
            <Route path="/home" element={<AdminHomeComponent />} />
        </Routes>
    );
}

export default MyRoutes;