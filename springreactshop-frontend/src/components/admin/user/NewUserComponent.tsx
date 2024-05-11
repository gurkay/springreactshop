import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { createUser, getUserById, updateUser } from "../../../app/features/userSlice/userCreateAsyncThunk";
import FormNewUserComponent from "../forms/FormNewUserComponent";
import { emptyUser, emptyUserWithoutId } from "../../../constants/emptyUser";
import { IUserDto, IUserDtoWithoutId } from "../../../interfaces/dtos/IUserDto";
import { clearUser, setUser } from "../../../app/features/userSlice/userSlice";

const NewUserComponent = () => {
    const dispatch = useDispatch<AppDispatch>();
    const selectorUser = useSelector((state: RootState) => state.userReducer);
    const navigate = useNavigate();
    const { userId } = useParams();
    const [errors, setErrors] = useState<IUserDto>(emptyUser);
    const [userInput, setUserInput] = useState<IUserDto>(emptyUser);

    useEffect(() => {
        if(userId) {
            getUser(Number(userId));
        }
    }, [userId]);

    function getUser(userId: number) {
        dispatch(getUserById(userId));
    }

    function handleFormElementChanged(name: string, value: string) {
        console.log(name);
        console.log(value);
        setUserInput((preUserInput) => {
            return {
               ...preUserInput,
                [name]: value
            }
        });
        console.log(userInput);
        dispatch(setUser({...selectorUser.user, [name]: value}));
        console.log(selectorUser.user);
    }

    function addOrEditUser(event: any) {
        event.preventDefault();
        if(!validateForm()) {
            return;
        }

        if(userId) {
            dispatch(updateUser({ userId: Number(userId), userDto: selectorUser.user }))
            .then((response: any) => {
                console.log(response);
                dispatch(clearUser());
                navigate('/admin/users');
            }).catch((error: any) => {
                console.log(error);
            });
        } else {
            dispatch(createUser(selectorUser.user))
            .then((response: any) => {
                console.log(response);
                dispatch(clearUser());
                navigate('/admin/users');
            }).catch((error: any) => {
                console.log(error);
            });
        }
    }

    const validateForm = () => {
        let isValid = true;
        const errorsCopy = { ...errors };

        if (selectorUser.user.firstName.trim()) {
            errorsCopy.firstName = '';
        } else {
            errors.firstName = 'First name is required';
            isValid = false;
        }

        if (selectorUser.user.lastName.trim()) {
            errorsCopy.lastName = '';
        } else {
            errorsCopy.lastName = 'Last name is required';
            isValid = false;
        }

        if (!selectorUser.user.email.includes("@") ||
            !selectorUser.user.email.includes(".") ||
            selectorUser.user.email.trim().length < 5) {
            errorsCopy.email = 'Invalid email';
            isValid = false;
        } else {
            errorsCopy.email = '';
        }

        setErrors(errorsCopy);
        return isValid;
    }

    const pageTitle = () => {
        return userId ? `Edit User` : `Add User`;
    }

    return (
        <div className="card mt-2">
            <h3 className="text-center">{pageTitle()}</h3>
            <FormNewUserComponent user={selectorUser.user} errors={errors} onChange={handleFormElementChanged} onSave={addOrEditUser} />
        </div>
    );
}

export default NewUserComponent;