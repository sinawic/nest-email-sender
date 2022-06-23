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
  UseInterceptors,
} from '@nestjs/common';
import { JwtGuard } from '../adminGuard';
import { SupporterEmailsService } from './supporterEmails.service';
import { CreateRoomDto } from './dto';
import { GetUser } from '../supporter/decorator';
import { FilesInterceptor } from '@nestjs/platform-express';


@UseGuards(JwtGuard)
@Controller('supporter/sendmail')
export class SupporterEmailsController {
  constructor(private supporterEmailService: SupporterEmailsService) { }

  @Post()
  // @UseInterceptors(FilesInterceptor('files'))
  getList(@GetUser() user) {
    console.log(user)
    return ({ page: 'paging' })
  }

  @Get('/a')
  get() {
    return ({ page: 'paging' })
  }

}
