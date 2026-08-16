import { IsString, IsOptional, IsIn, MinLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateOrgDto {
  @ApiPropertyOptional({ example: 'BookHub Ltd' })
  @IsOptional()
  @IsString()
  @MinLength(2)
  business_name?: string;

  @ApiPropertyOptional({ example: 'BookHub Bangladesh Ltd' })
  @IsOptional()
  @IsString()
  legal_name?: string;
}
