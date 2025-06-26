import { IUser } from '../interfaces/user.interface';

export class UserResponseDto implements IUser {
  id: string;
  email: string;
  name: string;
  phone?: string | null;
  role: 'ADMIN' | 'AGENT' | 'CUSTOMER';
  profileImage?: string | null;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(user: IUser) {
    this.id = user.id;
    this.email = user.email;
    this.name = user.name;
    this.phone = user.phone;
    this.role = user.role;
    this.profileImage = user.profileImage;
    this.verified = user.verified;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}