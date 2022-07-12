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
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto';
import { IdDto } from '../common/dto';

@UseGuards(BasicGuard)
@Controller('admin/rooms')
export class RoomsController {
  constructor(private roomService: RoomsService) { }

  @Get()
  getList(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('paging', new DefaultValuePipe(16), ParseIntPipe) paging: number) {
    return this.roomService.getRooms({ page, paging })
  }

  @Get(':_id')
  getById(@Param('_id') _id: IdDto) {
    return this.roomService.getRoomDetails(_id)
  }

  @Post()
  post(@Body() createRoomDto: CreateRoomDto) {
    return this.roomService.createRoom(createRoomDto)
  }

  @Put(':_id')
  put(
    @Param('_id') _id: IdDto,
    @Body() createRoomDto: CreateRoomDto) {
    return this.roomService.editRoom({ ...createRoomDto, _id })
  }

  @Delete(':_id')
  delete(@Param('_id') _id: IdDto) {
    return this.roomService.deleteRoom(_id)
  }

}
