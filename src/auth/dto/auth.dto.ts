import { IsEmail, IsString } from 'class-validator';

export declare class AuthDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}
