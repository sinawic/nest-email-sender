import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Room } from './schemas';
import { IdDto, PaginationDto } from '../common/dto';
import { CreateRoomDto, EditRoomDto } from './dto/create-room.dto';

@Injectable()
export class RoomsService {
  constructor(@InjectModel(Room.name) private roomModel: Model<any>) { }

  getRooms = async (paginationDto: PaginationDto) => {
    try {
      const rooms = await this.roomModel.find({})
        .sort({ 'date_created': -1 })
        .skip((paginationDto.page - 1) * paginationDto.paging)
        .limit((paginationDto.page - 1) * paginationDto.paging + paginationDto.paging)
      const count = await this.roomModel.countDocuments({})
      return { data: rooms, count }
    } catch (error) {
      throw new HttpException({ error: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

  getRoomDetails = async (_id: IdDto) => {
    try {
      return await this.roomModel.findOne({ _id })
    } catch (error) {
      throw new HttpException({ error: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

  createRoom = async (createRoomDto: CreateRoomDto) => {
    try {
      return await new this.roomModel({
        ...createRoomDto,
        date_created: new Date()
      }).save()
    } catch (error) {
      throw new HttpException({ error: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

  editRoom = async (editRoomDto: EditRoomDto) => {
    try {
      return await this.roomModel.findOneAndUpdate({ _id: editRoomDto._id }, editRoomDto)
    } catch (error) {
      throw new HttpException({ error: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

  deleteRoom = async (_id: IdDto) => {
    try {
      return await this.roomModel.findOneAndDelete({ _id })
    } catch (error) {
      throw new HttpException({ error: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

}
