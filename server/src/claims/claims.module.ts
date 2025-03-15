import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Claim, ClaimSchema } from './claim.schema';
import { ClaimsService } from './claims.service';
import { ClaimsController } from './claims.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Claim.name, schema: ClaimSchema }]),
    UsersModule,
  ],
  providers: [ClaimsService],
  controllers: [ClaimsController],
})
export class ClaimsModule {}
