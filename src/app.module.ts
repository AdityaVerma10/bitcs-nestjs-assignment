import { Module } from '@nestjs/common';
import { CatModule } from './cat/cat.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cats } from './cat/entities/cat.entity';
import { UserModule } from './user/user.module';
import { Users } from './user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './db/database.db',
      synchronize: false,
      entities: [Cats, Users],
    }),
    CatModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
