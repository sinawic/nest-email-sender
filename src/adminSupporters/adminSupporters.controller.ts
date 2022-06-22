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
import { BasicGuard } from '../adminGuard';
import { AdminSupportersService } from './adminSupporters.service';
import { CreateSupporterDto } from './dto';

@UseGuards(BasicGuard)
@Controller('admin/supporters')
export class AdminSupportersController {
  constructor(private adminSupporterService: AdminSupportersService) { }

  @Get()
  getList(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('paging', new DefaultValuePipe(16), ParseIntPipe) paging: number) {
    return this.adminSupporterService.getSupporters({ page, paging })
  }

  @Get(':id')
  getById(@Param('id') _id: string) {
    return this.adminSupporterService.getSupporterDetails(_id)
  }

  @Post()
  post(@Body() dto: CreateSupporterDto) {
    return this.adminSupporterService.createSupporter(dto)
  }

  @Put(':id')
  put(
    @Param('id') _id: string,
    @Body() dto: CreateSupporterDto) {
    return this.adminSupporterService.editSupporter({ ...dto, _id })
  }

  @Delete(':id')
  delete(@Param('id') _id: string) {
    return this.adminSupporterService.deleteSupporter(_id)
  }

}
