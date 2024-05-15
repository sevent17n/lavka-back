import { IsEmail, IsString } from 'class-validator';

export default class UserChangePasswordDto {
  @IsEmail()
  public email: string;

  @IsString()
  public oldPassword: string;

  @IsString()
  public password: string;
}
