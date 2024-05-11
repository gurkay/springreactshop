import { IUserDto, IUserDtoWithoutId } from "../interfaces/dtos/IUserDto";

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

export const emptyUserWithoutId: IUserDtoWithoutId = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  photos: '',
  enabled: false,
  roles: []
}