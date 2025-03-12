import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }) {
    const token = await this.authService.validateUser(loginDto.email, loginDto.password);
    const role = await this.authService.getRole(loginDto.email,loginDto.password);
    console.log(token,role);
    if (!token) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return { token,role };
  }
}
