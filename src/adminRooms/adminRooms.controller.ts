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
import { AdminRoomsService } from './adminRooms.service';
import { CreateRoomDto } from './dto';

@UseGuards(BasicGuard)
@Controller('admin/rooms')
export class AdminRoomsController {
  constructor(private adminRoomService: AdminRoomsService) { }

  @Get()
  getList(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('paging', new DefaultValuePipe(16), ParseIntPipe) paging: number) {
    return this.adminRoomService.getRooms({ page, paging })
  }

  @Get(':id')
  getById(@Param('id') _id: string) {
    return this.adminRoomService.getRoomDetails(_id)
  }

  @Post()
  post(@Body() dto: CreateRoomDto) {
    return this.adminRoomService.createRoom(dto)

  }

  @Put(':id')
  put(
    @Param('id') _id: string,
    @Body() dto: CreateRoomDto) {
    return this.adminRoomService.editRoom({ ...dto, _id })
  }

  @Delete(':id')
  delete(@Param('id') _id: string) {
    return this.adminRoomService.deleteRoom(_id)
  }

}
