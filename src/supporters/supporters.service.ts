import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { sha1 } from '../common/utils';
import { CreateSupporterDto } from './dto';
import { Supporter } from './schemas';
const crypto = require('crypto')

@Injectable()
export class SupportersService {
  constructor(@InjectModel(Supporter.name) private supporterModel: Model<any>) { }

  getSupporters = async ({ page, paging }: { page: number, paging: number }) => {
    const supporters = await this.supporterModel.aggregate([
      { $sort: { 'date_created': -1 } },
      { $limit: (page - 1) * paging + paging },
      { $skip: (page - 1) * paging }
    ])

    const count = await this.supporterModel.countDocuments({})
    return { data: supporters, count }
  }

  getSupporterDetails = async (_id: string) => {
    return await this.supporterModel.findOne({ _id: new mongoose.Types.ObjectId(_id) })
  }

  createSupporter = async (dto: CreateSupporterDto) => {
    try {
      return await new this.supporterModel({
        ...dto,
        password: sha1(dto.password),
        date_created: new Date()
      }).save()
    } catch (error) {
      throw new HttpException({ error: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

  editSupporter = async ({ _id, username, password }: { username: string, password: string, _id: string }) => {
    return await this.supporterModel.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(_id) }, {
      username,
      password: sha1(password)
    })
  }

  deleteSupporter = async (_id: string) => {
    return await this.supporterModel.findOneAndDelete({ _id: new mongoose.Types.ObjectId(_id) })
  }

}
