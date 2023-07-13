import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { RoleModule } from './role/role.module';
import { SalesModule } from './sales/sales.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot(),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    UsersModule,
    PrismaModule,
    ProductModule,
    CategoryModule,
    RoleModule,
    SalesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
