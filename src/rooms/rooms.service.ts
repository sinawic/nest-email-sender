import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Room } from './schemas';

@Injectable()
export class RoomsService {
  constructor(@InjectModel(Room.name) private roomModel: Model<any>) { }

  getRooms = async ({ page, paging }: { page: number, paging: number }) => {
    const rooms = await this.roomModel.aggregate([
      { $sort: { 'date_created': -1 } },
      { $limit: (page - 1) * paging + paging },
      { $skip: (page - 1) * paging }
    ])
    const count = await this.roomModel.countDocuments({})
    return { data: rooms, count }
  }

  getRoomDetails = async (_id: string) => {
    return await this.roomModel.findOne({ _id: new mongoose.Types.ObjectId(_id) })
  }

  createRoom = async ({ name, email, website }: { name: string, email: string, website: string }) => {
    try {
      return await new this.roomModel({
        name,
        email,
        website,
        date_created: new Date()
      }).save()
    } catch (error) {
      throw new HttpException({ error: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

  editRoom = async ({ _id, name, email, website }: { _id: string, name: string, email: string, website: string }) => {
    return await this.roomModel.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(_id) }, {
      name, email, website
    })
  }

  deleteRoom = async (_id: string) => {
    return await this.roomModel.findOneAndDelete({ _id: new mongoose.Types.ObjectId(_id) })
  }

}
