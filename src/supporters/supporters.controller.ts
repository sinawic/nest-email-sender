import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BasicGuard } from '../auth/Guard';
import { SupportersService } from './supporters.service';
import { CreateSupporterDto } from './dto';
import { IdDto } from 'src/common/dto';

@UseGuards(BasicGuard)
@Controller('admin/supporters')
export class SupportersController {
  constructor(private supporterService: SupportersService) { }

  @Get()
  getList(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('paging', new DefaultValuePipe(16), ParseIntPipe) paging: number) {
    return this.supporterService.getSupporters({ page, paging })
  }

  @Get(':_id')
  getById(@Param('_id') _id: IdDto) {
    return this.supporterService.getSupporterDetails(_id)
  }

  @Post()
  post(@Body() createSupporterDto: CreateSupporterDto) {
    return this.supporterService.createSupporter(createSupporterDto)
  }

  @Put(':_id')
  put(
    @Param('_id') _id: IdDto,
    @Body() createSupporterDto: CreateSupporterDto) {
    return this.supporterService.editSupporter({ ...createSupporterDto, _id })
  }

  @Delete(':_id')
  delete(@Param('_id') _id: IdDto) {
    return this.supporterService.deleteSupporter(_id)
  }

}
