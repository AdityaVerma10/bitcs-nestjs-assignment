import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthGuard } from './guards/auth.guard';
import { Users } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: 'auth_guard',
      useClass: AuthGuard,
    },
  ],
})
export class UserModule {}
