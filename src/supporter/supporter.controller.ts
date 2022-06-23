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
import { CreateSupporterDto } from './dto';
import { SupporterService } from './supporter.service';

@Controller('supporter/login')
export class SupporterController {
  constructor(private supporterService: SupporterService) { }

  @Post()
  post(@Body() dto: CreateSupporterDto,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('paging', new DefaultValuePipe(16), ParseIntPipe) paging: number) {
    return this.supporterService.validateLogin(dto)
  }

}
