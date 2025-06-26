export interface IUser {
  id: string;
  email: string;
  phone?: string | null;
  name: string;
  role: 'ADMIN' | 'AGENT' | 'CUSTOMER';
  profileImage?: string | null;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
}
