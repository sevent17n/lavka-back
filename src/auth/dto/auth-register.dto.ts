import { IsEmail, IsString } from 'class-validator';

export default class AuthRegisterDto {
  @IsEmail()
  public email: string;

  @IsString()
  public fio: string;

  @IsString()
  public phone: string;

  @IsString()
  public password: string;
}
