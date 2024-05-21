import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { createUser, getUserById, isEmailUnique, updateUser } from "../../../app/features/userSlice/userCreateAsyncThunk";
import FormNewUserComponent from "../forms/FormNewUserComponent";
import { emptyUser } from "../../../constants/emptyUser";
import { IUserDto } from "../../../interfaces/dtos/IUserDto";
import { clearUser, setUser } from "../../../app/features/userSlice/userSlice";
import { IRoleDto } from "../../../interfaces/dtos/IRoleDto";

const NewUserComponent = () => {
    const dispatch = useDispatch<AppDispatch>();
    const selectorUser = useSelector((state: RootState) => state.userReducer);
    const selectorRole = useSelector((state: RootState) => state.roleReducer);

    const navigate = useNavigate();
    const { userId } = useParams();
    const [errors, setErrors] = useState<IUserDto>(emptyUser);

    useEffect(() => {
        if (userId) {
            getUser(Number(userId));
        }
    }, [userId]);

    function getUser(userId: number) {
        dispatch(getUserById(userId));
    }

    function handleFormElementChanged(name: string, value: string) {
        dispatch(setUser({ ...selectorUser.user, [name]: value }));
    }

    function handleFormRolesChanged(name: string, roleId: number) {
        const role: IRoleDto | undefined = selectorRole.roles.find(r => r.id === roleId);
        if (role) {
            const newSelectedRoles: IRoleDto[] = selectorUser.user.roles.some(r => r.id === roleId)
                ? selectorUser.user.roles.filter(r => r.id !== role.id)
                : [...selectorUser.user.roles, role];
            dispatch(setUser({...selectorUser.user, [name]: newSelectedRoles }));
        }
    }

    function handleFormUserEnabled(name: string, isEnabled: boolean) {
        dispatch(setUser({...selectorUser.user, [name]: isEnabled }));
    }

    function handleFormCanselButton() {
        navigate('/admin/users');
    }

    function addOrEditUser(event: any) {
        event.preventDefault();
        if (!validateForm()) {
            return;
        }

        if (userId) {
            dispatch(updateUser({ userId: Number(userId), userDto: selectorUser.user }))
                .then((response: any) => {
                    console.log(response);
                    dispatch(clearUser());
                    navigate('/admin/users');
                }).catch((error: any) => {
                    console.log(error);
                });
        } else {
            dispatch(isEmailUnique(selectorUser.user.email));
            console.log(selectorUser.user);
            if (selectorUser.user.email.length > 0) {
                console.log("there is already a user with that email");
                return;
            } else {
                dispatch(createUser(selectorUser.user))
                .then((response: any) => {
                    console.log(response);
                    navigate('/admin/users');
                }).catch((error: any) => {
                    console.log(error);
                });
            }
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

        if (selectorUser.user.password.trim().length >= 4 && selectorUser.user.password.trim().length <= 32) {
            errorsCopy.password = '';
        } else {
            errorsCopy.password = 'Password must be between 4 and 32 characters';
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
            <h3>{pageTitle()}</h3>
            <FormNewUserComponent 
                user={selectorUser.user} 
                errors={errors} 
                onChange={handleFormElementChanged} 
                onSave={addOrEditUser} 
                roles={selectorRole.roles}
                onRolesChanged={handleFormRolesChanged}
                onEnabledChanged={handleFormUserEnabled}
                onCancel={handleFormCanselButton}
            />
        </div>
    );
}

export default NewUserComponent;