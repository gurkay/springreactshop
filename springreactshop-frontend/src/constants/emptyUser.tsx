import { IUserDto } from "../interfaces/IUserInitialState";

export const emptyUser: IUserDto = {
  id: 0,
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  photos: '',
  enabled: false,
  roles: []
}