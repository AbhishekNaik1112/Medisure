import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserRole } from './user.schema';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('register')
  async register(@Body() registerDto: { email: string; password: string; role: UserRole }) {
    const user = await this.usersService.register(registerDto.email, registerDto.password, registerDto.role);
    return user;
  }
}
