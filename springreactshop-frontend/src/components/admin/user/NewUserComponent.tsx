import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getUserById } from "../../../app/features/userSlice/userCreateAsyncThunk";
import FormNewUserComponent from "../forms/FormNewUserComponent";

const NewUserComponent = () => {
    const dispatch = useDispatch<AppDispatch>();
    const selectorUser = useSelector((state: RootState) => state.userReducer);
    const navigate = useNavigate();
    const { userId } = useParams();

    useEffect(() => {
        getUser(Number(userId));
    }, [userId]);

    function getUser(userId: number) {
        if (userId) {
            dispatch(getUserById(userId));
        }
    }

    const pageTitle = () => {
        return userId ? `Edit User` : `Add User`;
    }

    return (
        <div className="card mt-2">
            <h3 className="text-center">{pageTitle()}</h3>
            <FormNewUserComponent />
        </div>
    );
}

export default NewUserComponent;