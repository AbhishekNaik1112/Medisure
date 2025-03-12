import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<string | null> {
    const user = await this.usersService.findByEmail(email);
    if (user && user.password === password) {
      const payload = { sub: user._id, email: user.email, role: user.role };
      return this.jwtService.sign(payload);
    }
    return null;
  }

  async getRole(email: string,password:string): Promise<string | null> {
    const user = await this.usersService.findByEmail(email);
    if (user && user.password === password) {
      return user.role;
    }
    return null;
  }
}
