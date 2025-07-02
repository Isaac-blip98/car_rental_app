import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class ResetPasswordDto {
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsString({ message: 'Code must be a string' })
  @IsNotEmpty({ message: 'Reset code is required' })
  @MinLength(6, { message: 'Reset code must be at least 6 characters' })
  @MaxLength(6, { message: 'Reset code must be exactly 6 characters' })
  code: string;

  @IsString({ message: 'Password must be a string' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @IsNotEmpty({ message: 'New password is required' })
  newPassword: string;
}