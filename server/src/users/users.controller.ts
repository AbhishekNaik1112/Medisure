import { Controller, Post, Get, Param, Body, BadRequestException, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { User, UserRole } from './user.schema';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('register')
  async register(
    @Body() registerDto: { email: string; password: string; role: UserRole; companyName?: string; licenseNumber?: string }
  ) {
    if (registerDto.role === UserRole.INSURER) {
      if (!registerDto.companyName || !registerDto.licenseNumber) {
        throw new BadRequestException('Company name and license number are required for insurers.');
      }
    }

    return this.usersService.register(
      registerDto.email,
      registerDto.password,
      registerDto.role,
      registerDto.companyName,
      registerDto.licenseNumber
    );
  }

  @Get(':email')
  async getUserByEmail(@Param('email') email: string): Promise<User> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }
}
