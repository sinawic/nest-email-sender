import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import mongoose from 'mongoose';
import { AdminRoomsModels } from './adminRooms.models';

@Injectable()
export class AdminRoomsService {

  getRooms = async ({ page, paging }: { page: number, paging: number }) => {
    const rooms = await AdminRoomsModels.Room.aggregate([
      { $sort: { 'date_created': -1 } },
      { $limit: (page - 1) * paging + paging },
      { $skip: (page - 1) * paging }
    ])
    const count = await AdminRoomsModels.Room.countDocuments({})
    return { data: rooms, count }
  }

  getRoomDetails = async (_id: string) => {
    return await AdminRoomsModels.Room.findOne({ _id: new mongoose.Types.ObjectId(_id) })
  }

  createRoom = async ({ name, email, website }: { name: string, email: string, website: string }) => {
    try {
      return await new AdminRoomsModels.Room({
        name,
        email,
        website,
        date_created: new Date()
      }).save()
    } catch (error) {
      throw new HttpException({ error: error.toString() }, HttpStatus.BAD_REQUEST)
    }
  }

  editRoom = async ({ _id, name, email, website }: { _id: string, name: string, email: string, website: string }) => {
    return await AdminRoomsModels.Room.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(_id) }, {
      name, email, website
    })
  }

  deleteRoom = async (_id: string) => {
    return await AdminRoomsModels.Room.findOneAndDelete({ _id: new mongoose.Types.ObjectId(_id) })
  }

}
