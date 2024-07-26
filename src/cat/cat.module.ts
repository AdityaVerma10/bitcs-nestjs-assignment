import { Module } from '@nestjs/common';
import { CatService } from './cat.service';
import { CatController } from './cat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cats } from './entities/cat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cats])],
  controllers: [CatController],
  providers: [CatService],
})
export class CatModule {}
