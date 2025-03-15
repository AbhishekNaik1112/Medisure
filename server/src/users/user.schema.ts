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

  // @Prop()
  // Activity!: boolean | false;

  @Prop()
  Notifications!: any[];

  @Prop({ required: true, enum: UserRole })
  role!: UserRole;

  @Prop({
    required: function (this: User) {
      return this.role === UserRole.INSURER;
    },
  })
  companyName?: string;

  @Prop({
    required: function (this: User) {
      return this.role === UserRole.INSURER;
    },
  })
  licenseNumber?: string;

  _id: any;
}

export const UserSchema = SchemaFactory.createForClass(User);
