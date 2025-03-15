// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { Claim, ClaimDocument } from './claim.schema';
// import { User, UserDocument } from '../users/user.schema';

// @Injectable()
// export class ClaimsService {
//   constructor(
//     // @InjectModel(User.name) private userModel: Model<UserDocument>,
//     @InjectModel(Claim.name) private claimModel: Model<ClaimDocument>
//   ) {}

//   async createClaim(createClaimDto: any): Promise<Claim> {
//     const createdClaim = new this.claimModel(createClaimDto);
//     return createdClaim.save();
//   }

//   async findAll(patientEmail?: string): Promise<Claim[]> {
//     if (patientEmail) {
//       return this.claimModel.find({ patientEmail }).exec();
//     }
//     return this.claimModel.find().exec();
//   }

//   async updateClaim(id: string, updateDto: any): Promise<Claim | null> {
//     const claimDetails = await this.claimModel.findById(id);
//     // console.log(claimDetails);
//     if (!claimDetails) {
//       throw new Error('Claim not found');
//     }
//     const userEmail = claimDetails.patientEmail;
//     console.log(userEmail);

//     // const userDetails = await this.userModel.findOne({ patientEmail: userEmail });
//     // console.log(userDetails);
//     //i want to update notifications array in user schema
//     // userDetails.Notifications.push(updateDto);
//     return this.claimModel.findByIdAndUpdate(id, updateDto, { new: true }).exec();
//   }
// }

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Claim, ClaimDocument } from '../claims/claim.schema';
import { User, UserDocument } from '../users/user.schema';

@Injectable()
export class ClaimsService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Claim.name) private claimModel: Model<ClaimDocument>,
  ) {}

  async createClaim(createClaimDto: any): Promise<Claim> {
    const createdClaim = new this.claimModel(createClaimDto);
    return createdClaim.save();
  }

  async findAll(patientEmail?: string): Promise<Claim[]> {
    if (patientEmail) {
      return this.claimModel.find({ patientEmail }).exec();
    }
    return this.claimModel.find().exec();
  }

  async updateClaim(id: string, updateDto: any): Promise<Claim | null> {
    const claimDetails = await this.claimModel.findById(id);
    if (!claimDetails) {
      throw new Error('Claim not found');
    }
    const userEmail = claimDetails.patientEmail;
    // console.log('Updating claim for user:', userEmail);

    const userDetails = await this.userModel.findOne({ email: userEmail });
    if (userDetails) {
      if (!Array.isArray(userDetails.Notifications)) {
        userDetails.Notifications = [];
      }
      userDetails.Notifications.push(updateDto);
      await userDetails.save();
    } else {
      console.warn('User not found for email:', userEmail);
    }

    return this.claimModel.findByIdAndUpdate(id, updateDto, { new: true }).exec();
  }
}
