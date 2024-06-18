import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { createUser, createUserNoUserPhotos, getUserById, isEmailUnique, updateUser } from "../../../app/features/userSlice/userCreateAsyncThunk";
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
    const [thumbnail, setThumbnail] = useState<any>();
    const [photos, setPhotos] = useState<File>();

    useEffect(() => {
        if (userId) {
            getUser(Number(userId));
        }
    }, [userId]);

    function onImageChanged(e: any) {
        const fileSize = e.target.files[0].size;

        if (fileSize > 1048576) {
            alert("File size is too large!");
            return;
        }

        setPhotos(e.target.files[0]);
        setThumbnail(URL.createObjectURL(e.target.files[0]));
    }

    function getUser(userId: number) {
        dispatch(getUserById(userId));
        setThumbnail(selectorUser.user.photosImagePath);
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
            dispatch(setUser({ ...selectorUser.user, [name]: newSelectedRoles }));
        }
    }

    function handleFormUserEnabled(name: string, isEnabled: boolean) {
        dispatch(setUser({ ...selectorUser.user, [name]: isEnabled }));
    }

    function handleFormCanselButton() {
        navigate('/admin/users');
    }

    async function addOrEditUser(event: any) {
        event.preventDefault();

        if (userId) {
            dispatch(updateUser({ userId: Number(userId), userDto: selectorUser.user, image: photos }));
            navigate('/admin/users');
            window.location.reload();
            dispatch(clearUser());
        } else {
            const result = await validateForm();
            if (!result) {
                return;
            }

            if( photos === undefined || photos === null) {
                console.log('no image')
                dispatch(createUserNoUserPhotos({ userDto: selectorUser.user}))
                .then((response: any) => {
                    console.log(response);
                    navigate('/admin/users');
                    window.location.reload();
                    
                })
                .catch((error: any) => {
                    console.log(error);
                });
            } else {
                dispatch(createUser({ userDto: selectorUser.user, image: photos! }))
                .then((response: any) => {
                    console.log(response);
                    window.location.reload();
                    navigate('/admin/users');
                })
                .catch((error: any) => {
                    console.log(error);
                });
            }


        }
    }

    async function validateForm() {
        let isValid = true;
        const errorsCopy = { ...errors };

        if (selectorUser.user.firstName?.trim()) {
            errorsCopy.firstName = '';
        } else {
            errorsCopy.firstName = 'First name is required';
            isValid = false;
        }

        if (selectorUser.user.lastName?.trim()) {
            errorsCopy.lastName = '';
        } else {
            errorsCopy.lastName = 'Last name is required';
            isValid = false;
        }

        if (selectorUser.user.password?.trim().length >= 4 && selectorUser.user.password?.trim().length <= 32) {
            errorsCopy.password = '';
        } else {
            errorsCopy.password = 'Password must be between 4 and 32 characters';
            isValid = false;
        }

        if (!selectorUser.user.email?.includes("@") ||
            !selectorUser.user.email?.includes(".") ||
            selectorUser.user.email?.trim().length < 5) {
            errorsCopy.email = 'Email is invalid';
            isValid = false;
        } else {
            await dispatch(isEmailUnique(selectorUser.user.email)).then((response: any) => {
                if (response.payload) {
                    errorsCopy.email = 'There is already a user with that email';
                    isValid = false;
                } else {
                    errorsCopy.email = '';
                }
            }).catch((error: any) => {
                console.log(error);
            });
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
                thumbnail={thumbnail}
                onImageChanged={onImageChanged}
            />
        </div>
    );
}

export default NewUserComponent;