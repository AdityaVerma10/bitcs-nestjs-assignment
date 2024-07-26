import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ParseIntPipe,
  Put,
  Query,
  BadRequestException,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CatService } from './cat.service';
import { CreateCatDto } from './dto/create.cat.dto';
import { JoiValidationPipe } from './pipes/validation.pipe';
import { CatSchema } from './dto/cat.schema';
import { AuthGuard } from 'src/user/guards/auth.guard';

@Controller('cats')
export class CatController {
  constructor(private readonly catService: CatService) {}

  @Post()
  @UseGuards(new AuthGuard())
  @UsePipes(new JoiValidationPipe(CatSchema))
  create(@Body() createCatDto: CreateCatDto) {
    return this.catService.create(createCatDto);
  }

  @Get('')
  findAll(
    @Query('page') page: number, // Here ParseIntPipe is not use because its give error on /cats route when no page and limit given.
    @Query('limit') limit: number,
  ) {
    page = Number(page);
    limit = Number(limit);
    if (page === 0 || limit === 0)
      throw new BadRequestException('Valid Range Must be Required!');
    return this.catService.findAll(page, limit);
  }

  @Get('search')
  findByAge(
    @Query('age_lte', ParseIntPipe) age_lte: number,
    @Query('age_gte', ParseIntPipe) age_gte: number,
  ) {
    if (age_lte >= age_gte || (age_lte === 0 && age_gte === 0))
      throw new BadRequestException('Valid Range Must be Required!');
    return this.catService.findByAgeRange(age_lte, age_gte);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.catService.findOne(+id);
  }

  @Put(':id')
  @UseGuards(new AuthGuard())
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatedCat: Partial<CreateCatDto>,
  ) {
    if (!updatedCat.age && !updatedCat.name && !updatedCat.breed)
      return 'At least one field is required!';
    return this.catService.update(+id, updatedCat);
  }

  @Delete(':id')
  @UseGuards(new AuthGuard())
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.catService.remove(+id);
  }
}
