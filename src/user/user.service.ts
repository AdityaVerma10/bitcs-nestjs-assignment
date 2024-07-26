import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/user.entity';
import { login } from './types/types';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const user = this.userRepository.create(createUserDto);
      const result = await this.userRepository.save(user);
      return result;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async login({ email, password }: login) {
    try {
      const user = await this.userRepository.find({ where: { email } });

      if (user[0].password !== password) {
        throw new Error('Email or Password Invalid');
      } else {
        const token = jwt.sign({ id: user[0].id }, 'secret', {
          expiresIn: '1hr',
        });
        return {
          user,
          jwtToken: token,
        };
      }
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
