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

  @Get(':id')
  getById(@Param('id') _id: string) {
    return this.supporterService.getSupporterDetails(_id)
  }

  @Post()
  post(@Body() createSupporterDto: CreateSupporterDto) {
    return this.supporterService.createSupporter(createSupporterDto)
  }

  @Put(':id')
  put(
    @Param('id') _id: string,
    @Body() createSupporterDto: CreateSupporterDto) {
    return this.supporterService.editSupporter({ ...createSupporterDto, _id })
  }

  @Delete(':id')
  delete(@Param('id') _id: string) {
    return this.supporterService.deleteSupporter(_id)
  }

}
