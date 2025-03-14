import { Controller, Post, Get, Patch, Param, Body, Query, UseGuards } from '@nestjs/common';
import { ClaimsService } from './claims.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('claims')
export class ClaimsController {
  constructor(private claimsService: ClaimsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createClaimDto: any) {
    return this.claimsService.createClaim(createClaimDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Query('patientEmail') patientEmail?: string) {
    return this.claimsService.findAll(patientEmail);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDto: any) {
    return this.claimsService.updateClaim(id, updateDto);
  }
}
