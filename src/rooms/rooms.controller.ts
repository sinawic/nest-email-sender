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

  @Get(':id')
  getById(@Param('id') _id: string) {
    return this.roomService.getRoomDetails(_id)
  }

  @Post()
  post(@Body() createRoomDto: CreateRoomDto) {
    return this.roomService.createRoom(createRoomDto)
  }

  @Put(':id')
  put(
    @Param('id') _id: string,
    @Body() createRoomDto: CreateRoomDto) {
    return this.roomService.editRoom({ ...createRoomDto, _id })
  }

  @Delete(':id')
  delete(@Param('id') _id: string) {
    return this.roomService.deleteRoom(_id)
  }

}
