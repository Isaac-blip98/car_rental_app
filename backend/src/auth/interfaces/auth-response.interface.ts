import { IUser } from "src/user/interfaces/user.interface";

export interface AuthResponse {
  accessToken: string;
  user: IUser;
}
