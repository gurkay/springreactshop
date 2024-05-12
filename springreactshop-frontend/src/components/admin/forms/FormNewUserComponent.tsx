import { IRoleDto } from "../../../interfaces/dtos/IRoleDto";
import { IUserDto } from "../../../interfaces/dtos/IUserDto";

interface FormNewUserComponentProps {
    user: IUserDto;
    onChange: (name: string, value: string) => void;
    errors: IUserDto;
    onSave: (event: any) => void;
    roles: IRoleDto[];
    onRolesChanged: (name: string, roleId: number) => void;
}

const FormNewUserComponent = ({ user, onChange, errors, onSave, roles, onRolesChanged }: FormNewUserComponentProps) => {

    return (
        <form className="form">
            <div className="border border-secondary p-2 rounded">

                <div className="form-group row mt-2">
                    <label className="col-form-label col-sm-4">E-mail</label>
                    <div className="col-sm-8">
                        <input
                            type="email"
                            placeholder="Enter E-mail"
                            name="email"
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            value={user.email}
                            onChange={(e: any) => onChange('email', e.target.value)}
                            required
                            minLength={8}
                            maxLength={128}
                        />
                        {
                            errors.email &&
                            <div className='invalid-feedback'>
                                {errors.email}
                            </div>
                        }
                    </div>
                </div>

                <div className="form-group row mt-2">
                    <label className="col-form-label col-sm-4">First Name</label>
                    <div className="col-sm-8">
                        <input
                            type="text"
                            placeholder="Enter first name"
                            name="firstName"
                            className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                            value={user.firstName}
                            onChange={(e: any) => onChange('firstName', e.target.value)}
                            required
                            minLength={2}
                            maxLength={64}
                        />
                        {
                            errors.firstName &&
                            <div className='invalid-feedback'>
                                {errors.firstName}
                            </div>
                        }
                    </div>
                </div>

                <div className="form-group row mt-2">
                    <label className="col-form-label col-sm-4">Last Name</label>
                    <div className="col-sm-8">
                        <input
                            type="text"
                            placeholder="Enter last name"
                            name="lastName"
                            className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                            value={user.lastName}
                            onChange={(e: any) => onChange('lastName', e.target.value)}
                            required
                            minLength={2}
                            maxLength={64}
                        />
                        {
                            errors.lastName &&
                            <div className='invalid-feedback'>
                                {errors.lastName}
                            </div>
                        }
                    </div>
                </div>

                <div className="form-group row mt-2">
                    <label className="col-form-label col-sm-4">Password</label>
                    <div className="col-sm-8">
                        <input
                            type="password"
                            placeholder="Enter password"
                            name="password"
                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                            value={user.password}
                            onChange={(e: any) => onChange('password', e.target.value)}
                            required
                            minLength={4}
                            maxLength={32}
                        />
                        {
                            errors.password &&
                            <div className='invalid-feedback'>
                                {errors.password}
                            </div>
                        }
                    </div>
                </div>

                <div className="form-group row mt-2">
                    <label className="col-form-label col-sm-4">Roles</label>
                    <div className="col-sm-8 text-left">
                        {
                            roles.map((role: IRoleDto) => (
                                <label className="form-check-label" key={role.id}>
                                    <input
                                        type="checkbox"
                                        value={role.id}
                                        checked={user.roles.some(r => r.id === role.id)}
                                        onChange={(event: any) => {onRolesChanged('roles', Number(event.target.value))}}
                                    />
                                    {role.name}: {role.description}
                                </label>

                            ))
                        }
                    </div>
                </div>

                <div className="text-center mt-2">
                    <button onClick={onSave} className="btn btn-success m-2">Save</button>
                    <button onClick={() => { }} className="btn btn-secondary">Cancel</button>
                </div>
            </div>
        </form>
    );
}

export default FormNewUserComponent;