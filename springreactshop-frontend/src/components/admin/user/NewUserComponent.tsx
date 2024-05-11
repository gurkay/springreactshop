import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserById } from "../../../app/features/userSlice/userCreateAsyncThunk";
import FormNewUserComponent from "../forms/FormNewUserComponent";
import { emptyUserWithoutId } from "../../../constants/emptyUser";
import { IUserDtoWithoutId } from "../../../interfaces/dtos/IUserDto";

const NewUserComponent = () => {
    const dispatch = useDispatch<AppDispatch>();
    const selectorUser = useSelector((state: RootState) => state.userReducer);
    const navigate = useNavigate();
    const { userId } = useParams();
    const [userInput, setUserInput] = useState<IUserDtoWithoutId>(emptyUserWithoutId);

    useEffect(() => {
        if(userId) {
            getUser(Number(userId));
        }
    }, [userId]);

    function getUser(userId: number) {
        dispatch(getUserById(userId));
    }

    function handleFormElementChanged(name: string, value: string) {
        setUserInput((preUserInput) => {
            return {
               ...preUserInput,
                [name]: value
            }
        });
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