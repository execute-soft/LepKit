import { IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateOrgStatusDto {
  @ApiProperty({ example: 'blocked', enum: ['active', 'inactive', 'blocked', 'suspended'] })
  @IsIn(['active', 'inactive', 'blocked', 'suspended'])
  status!: string;
}
