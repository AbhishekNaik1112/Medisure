import { Controller, Post, Get, Patch, Param, Body, UseGuards } from '@nestjs/common';
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
  async findAll() {
    return this.claimsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDto: any) {
    return this.claimsService.updateClaim(id, updateDto);
  }
}
