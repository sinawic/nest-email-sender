import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import mongoose from 'mongoose';
import { sha1 } from 'src/helpers';
import { AdminSupportersModels } from './adminSupporters.models';

@Injectable()
export class AdminSupportersService {

  getSupporters = async ({ page, paging }: { page: number, paging: number }) => {
    const supporters = await AdminSupportersModels.Supporter.aggregate([
      { $sort: { 'date_created': -1 } },
      { $limit: (page - 1) * paging + paging },
      { $skip: (page - 1) * paging }
    ])

    const count = await AdminSupportersModels.Supporter.countDocuments({})
    return { data: supporters, count }
  }

  getSupporterDetails = async (_id: string) => {
    return await AdminSupportersModels.Supporter.findOne({ _id: new mongoose.Types.ObjectId(_id) })
  }

  createSupporter = async ({ username, password, room }: { username: string, password: string, room: string }) => {
    try {
      return await new AdminSupportersModels.Supporter({
        username,
        password: sha1(password),
        room,
        date_created: new Date()
      }).save()
    } catch (error) {
      throw new HttpException({ error: error.toString() }, HttpStatus.BAD_REQUEST)
    }
  }

  editSupporter = async ({ _id, username, password }: { username: string, password: string, _id: string }) => {
    return await AdminSupportersModels.Supporter.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(_id) }, {
      username,
      password: sha1(password)
    })
  }

  deleteSupporter = async (_id: string) => {
    return await AdminSupportersModels.Supporter.findOneAndDelete({ _id: new mongoose.Types.ObjectId(_id) })
  }

}
