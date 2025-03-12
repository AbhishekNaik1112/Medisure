import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ClaimDocument = Claim & Document;

export enum ClaimStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

@Schema({ timestamps: true })
export class Claim {
  @Prop({ required: true })
  patientName!: string;

  @Prop({ required: true })
  patientEmail!: string;

  @Prop({ required: true })
  amount!: number;

  @Prop()
  description!: string;

  @Prop({ default: ClaimStatus.PENDING, enum: ClaimStatus })
  status!: ClaimStatus;

  @Prop()
  supportingDocuments!: string[]; 

  @Prop()
  insurerComments?: string;
}

export const ClaimSchema = SchemaFactory.createForClass(Claim);
