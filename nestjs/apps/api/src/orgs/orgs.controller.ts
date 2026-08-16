import {
  Controller,
  Get,
  Patch,
  Post,
  Param,
  Body,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { OrgsService } from './orgs.service';
import { OrgOnboardingService } from './org-onboarding.service';
import { UpdateOrgDto } from './dto/update-org.dto';
import { UpdateOrgStatusDto } from './dto/update-status.dto';
import { RegisterOrgDto } from './dto/register-org.dto';

@ApiTags('Organizations')
@Controller({ path: 'orgs', version: '1' })
export class OrgsController {
  constructor(
    private readonly orgsService: OrgsService,
    private readonly onboardingService: OrgOnboardingService,
  ) {}

  @Post('register')
  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @ApiOperation({ summary: 'Register a new organization with admin user' })
  @ApiResponse({ status: 201, description: 'Organization created. Verify your email to continue.' })
  @ApiResponse({ status: 409, description: 'Admin email already registered' })
  registerOrg(@Body() dto: RegisterOrgDto) {
    return this.onboardingService.registerOrg(dto);
  }

  @Get()
  @ApiOperation({ summary: 'List all organizations with pagination' })
  @ApiQuery({ name: 'page', required: false, schema: { type: 'number', default: 1 } })
  @ApiQuery({ name: 'limit', required: false, schema: { type: 'number', default: 10 } })
  @ApiQuery({ name: 'search', required: false, schema: { type: 'string' } })
  findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
  ) {
    const safePage = Math.max(1, Number(page) || 1);
    const safeLimit = Math.min(100, Math.max(1, Number(limit) || 10));
    return this.orgsService.findAll(safePage, safeLimit, search);
  }

  @Get(':orgId')
  @ApiOperation({ summary: 'Get organization by ID' })
  @ApiResponse({ status: 404, description: 'Not found' })
  findOne(@Param('orgId', ParseUUIDPipe) orgId: string) {
    return this.orgsService.findById(orgId);
  }

  @Patch(':orgId')
  @ApiOperation({ summary: 'Update organization details' })
  @ApiResponse({ status: 404, description: 'Not found' })
  update(
    @Param('orgId', ParseUUIDPipe) orgId: string,
    @Body() dto: UpdateOrgDto,
  ) {
    return this.orgsService.update(orgId, dto);
  }

  @Patch(':orgId/status')
  @ApiOperation({ summary: 'Block/unblock or change organization status' })
  @ApiResponse({ status: 404, description: 'Not found' })
  updateStatus(
    @Param('orgId', ParseUUIDPipe) orgId: string,
    @Body() dto: UpdateOrgStatusDto,
  ) {
    return this.orgsService.updateStatus(orgId, dto);
  }
}
