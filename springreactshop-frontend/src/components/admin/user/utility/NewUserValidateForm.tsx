
import { IUserDto } from "../../../../interfaces/dtos/IUserDto";

interface IProps {
    errors: IUserDto;
    user: IUserDto;
}

export const NewUserValidateForm = async({ errors, user }: IProps) => {

    let isValid = true;
    const errorsCopy = { ...errors };

    if (user.firstName.trim()) {
        errorsCopy.firstName = '';
    } else {
        errors.firstName = 'First name is required';
        isValid = false;
    }

    if (user.lastName.trim()) {
        errorsCopy.lastName = '';
    } else {
        errorsCopy.lastName = 'Last name is required';
        isValid = false;
    }

    if (user.password.trim().length >= 4 && user.password.trim().length <= 32) {
        errorsCopy.password = '';
    } else {
        errorsCopy.password = 'Password must be between 4 and 32 characters';
        isValid = false;
    }

    if (!user.email.includes("@") ||
        !user.email.includes(".") ||
        user.email.trim().length < 5) {
        errorsCopy.email = 'Invalid email';
        isValid = false;
    } else {
        errorsCopy.email = '';
    }



    return isValid;
}