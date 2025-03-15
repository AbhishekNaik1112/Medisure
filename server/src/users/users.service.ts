import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument, UserRole } from './user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(user: Partial<User>): Promise<User> {
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async register(email: string, password: string, role: UserRole, companyName?: string, licenseNumber?: string): Promise<User> {
    if (role === UserRole.INSURER) {
      if (!companyName || !licenseNumber) {
        throw new BadRequestException('Company name and license number are required for insurers.');
      }
    }

    const user = new this.userModel({ email, password, role, companyName, licenseNumber });
    return user.save();
  }
}


