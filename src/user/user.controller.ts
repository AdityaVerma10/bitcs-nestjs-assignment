import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  UsePipes,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { login } from './types/types';
import { JoiValidationPipe } from 'src/cat/pipes/validation.pipe';
import { UserSchema } from './dto/user.schema';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(new JoiValidationPipe(UserSchema))
  create(@Body() createUserDto: CreateUserDto) {
    if (!createUserDto.email || !createUserDto.name || !createUserDto.password)
      throw new BadRequestException('All Fields is Required!');
    return this.userService.create(createUserDto);
  }

  @Post('/login')
  userLogin(@Body() { email, password }: login) {
    if (!email || !password)
      throw new BadRequestException('All Fields is Required!');
    return this.userService.login({ email, password });
  }
}
