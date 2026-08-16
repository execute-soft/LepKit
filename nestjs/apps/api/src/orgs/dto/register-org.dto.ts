import { IsEmail, IsString, MinLength, Matches, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RegisterOrgDto {
  @ApiProperty({ example: 'Acme Corp' })
  @IsString()
  @MinLength(2)
  business_name!: string;

  @ApiPropertyOptional({ example: 'Acme Corporation Ltd.' })
  @IsString()
  @IsOptional()
  legal_name?: string;

  @ApiProperty({ example: 'admin@acme.com' })
  @IsEmail()
  admin_email!: string;

  @ApiProperty({ example: 'Password123!' })
  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
    message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
  })
  admin_password!: string;

  @ApiProperty({ example: 'John' })
  @IsString()
  @IsOptional()
  admin_firstName?: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  @IsOptional()
  admin_lastName?: string;
}
