import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserRole } from './user.schema';

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

    const user = await this.usersService.register(
      registerDto.email,
      registerDto.password,
      registerDto.role,
      registerDto.companyName,
      registerDto.licenseNumber
    );

    return user;
  }
}
