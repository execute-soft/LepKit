import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OauthExchangeDto {
  @ApiProperty({ description: 'OAuth exchange code from Google callback' })
  @IsString()
  @IsNotEmpty()
  code!: string;
}
