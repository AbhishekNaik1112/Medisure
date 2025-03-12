import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

export enum UserRole {
  PATIENT = 'patient',
  INSURER = 'insurer',
}

@Schema()
export class User {
  @Prop({ required: true })
  email!: string;

  @Prop({ required: true })
  password!: string;

  @Prop({ required: true, enum: UserRole })
  role!: UserRole;
    _id: any;
}

export const UserSchema = SchemaFactory.createForClass(User);
