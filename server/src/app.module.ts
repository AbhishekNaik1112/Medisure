// import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
// import { AuthModule } from './auth/auth.module';
// import { UsersModule } from './users/users.module';
// import { ClaimsModule } from './claims/claims.module';
// import { CorsMiddleware } from '@nest-middlewares/cors';
// import * as dotenv from 'dotenv';

// dotenv.config();

// @Module({
//   imports: [
//     MongooseModule.forRoot(process.env.MONGODB_URI || 'fallback'),
//     AuthModule,
//     UsersModule,
//     ClaimsModule,
//   ],
// })
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(CorsMiddleware).forRoutes('*');
//   }
// }
// // export class AppModule {}


import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ClaimsModule } from './claims/claims.module';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI || 'fallback'),
    AuthModule,
    UsersModule,
    ClaimsModule,
  ],
})
export class AppModule {}
