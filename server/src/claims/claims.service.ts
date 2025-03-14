import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Claim, ClaimDocument } from './claim.schema';

@Injectable()
export class ClaimsService {
  constructor(@InjectModel(Claim.name) private claimModel: Model<ClaimDocument>) {}

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
    return this.claimModel.findByIdAndUpdate(id, updateDto, { new: true }).exec();
  }
}
