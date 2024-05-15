import { IsJWT, IsString } from 'class-validator';

export default class AuthRefreshTokenDto {
  @IsJWT()
  refreshToken: string;
}
