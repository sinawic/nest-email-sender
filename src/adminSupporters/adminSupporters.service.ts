import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import mongoose from 'mongoose';
import { AdminSupportersModels } from './adminSupporters.models';
const crypto = require('crypto')

@Injectable()
export class AdminSupportersService {
  constructor(private supportersModels: AdminSupportersModels) { }

  sha1(val: string) {
    var shasum = crypto.createHash('sha1')
    shasum.update(val)
    return shasum.digest('hex')
  }

  getSupporters = async ({ page, paging }: { page: number, paging: number }) => {
    const supporters = await this.supportersModels.Supporter.aggregate([
      { $sort: { 'date_created': -1 } },
      { $limit: (page - 1) * paging + paging },
      { $skip: (page - 1) * paging }
    ])

    const count = await this.supportersModels.Supporter.countDocuments({})
    return { data: supporters, count }
  }

  getSupporterDetails = async (_id: string) => {
    return await this.supportersModels.Supporter.findOne({ _id: new mongoose.Types.ObjectId(_id) })
  }

  createSupporter = async ({ username, password, room }: { username: string, password: string, room: string }) => {
    try {
      return await new this.supportersModels.Supporter({
        username,
        password: this.sha1(password),
        room,
        date_created: new Date()
      }).save()
    } catch (error) {
      throw new HttpException({ error: error.toString() }, HttpStatus.BAD_REQUEST)
    }
  }

  editSupporter = async ({ _id, username, password }: { username: string, password: string, _id: string }) => {
    return await this.supportersModels.Supporter.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(_id) }, {
      username,
      password: this.sha1(password)
    })
  }

  deleteSupporter = async (_id: string) => {
    return await this.supportersModels.Supporter.findOneAndDelete({ _id: new mongoose.Types.ObjectId(_id) })
  }

}
