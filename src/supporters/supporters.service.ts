import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { sha1 } from '../common/utils';
import { CreateSupporterDto, EditSupporterDto } from './dto';
import { Supporter } from './schemas';
import { PaginationDto } from '../common/dto';
const crypto = require('crypto')

@Injectable()
export class SupportersService {
  constructor(@InjectModel(Supporter.name) private supporterModel: Model<any>) { }

  getSupporters = async (paginationDto: PaginationDto) => {
    const supporters = await this.supporterModel.find({})
      .sort({ 'date_created': -1 })
      .skip((paginationDto.page - 1) * paginationDto.paging)
      .limit((paginationDto.page - 1) * paginationDto.paging + paginationDto.paging)

    const count = await this.supporterModel.countDocuments({})
    return { data: supporters, count }
  }

  getSupporterDetails = async (_id: string) => {
    return await this.supporterModel.findOne({ _id })
  }

  createSupporter = async (createSupporterDto: CreateSupporterDto) => {
    try {
      return await new this.supporterModel({
        ...createSupporterDto,
        password: sha1(createSupporterDto.password),
        date_created: new Date()
      }).save()
    } catch (error) {
      throw new HttpException({ error: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

  editSupporter = async (editSupporterDto: EditSupporterDto) => {
    return await this.supporterModel.findOneAndUpdate({ _id: editSupporterDto._id }, {
      ...editSupporterDto,
      password: sha1(editSupporterDto.password)
    })
  }

  deleteSupporter = async (_id: string) => {
    return await this.supporterModel.findOneAndDelete({ _id })
  }

}
