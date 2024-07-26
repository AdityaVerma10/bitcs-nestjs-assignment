import {
  BadRequestException,
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { CreateCatDto } from './dto/create.cat.dto';
import { Between, DataSource, Repository } from 'typeorm';
import { Cats } from './entities/cat.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CatService {
  constructor(
    @InjectRepository(Cats)
    private readonly catRepository: Repository<Cats>,
  ) {}

  async create(createCatDto: CreateCatDto): Promise<Cats> {
    try {
      const cat = this.catRepository.create(createCatDto);
      await this.catRepository.save(cat);
      return cat;
    } catch (error) {
      throw new NotImplementedException('Unable to create!');
    }
  }

  async findAll(
    page: number = 1,
    limit: number = 8,
  ): Promise<[Cats[], number]> {
    try {
      const skip = (page - 1) * limit;

      return await this.catRepository.findAndCount({
        take: limit,
        skip,
      });
    } catch (error) {
      throw new NotFoundException('Unable to fetch data');
    }
  }

  async findOne(id: number): Promise<Cats> {
    try {
      return await this.catRepository.findOne({ where: { id } });
    } catch (error) {
      throw new NotFoundException('Unable to fetch data');
    }
  }

  async findByAgeRange(age_lte: number, age_gte: number): Promise<Cats[]> {
    try {
      return await this.catRepository.find({
        where: { age: Between(age_lte, age_gte) },
      });
    } catch (error) {
      throw new NotFoundException('Unable to fetch data');
    }
  }

  async update(id: number, updatedData: Partial<CreateCatDto>) {
    try {
      await this.catRepository.update(id, { ...updatedData });
      return await this.catRepository.findOne({ where: { id } });
    } catch (error) {
      throw new BadRequestException('Unable to update data');
    }
  }

  async remove(id: number) {
    try {
      const result = await this.catRepository.delete(id);
      if (!result.affected)
        throw new BadRequestException({
          message: 'Unable to delte Cat',
        });
      return { message: 'Deleted Succesfully' };
    } catch (error) {
      throw new BadRequestException('Unable to delete cat');
    }
  }
}
