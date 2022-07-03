import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { sha1 } from '../common/utils';
import { CreateSupporterDto, EditSupporterDto } from './dto';
import { Supporter } from './schemas';
import { IdDto, PaginationDto } from '../common/dto';
const crypto = require('crypto')

@Injectable()
export class SupportersService {
  constructor(@InjectModel(Supporter.name) private supporterModel: Model<any>) { }

  getSupporters = async (paginationDto: PaginationDto) => {
    try {
      const supporters = await this.supporterModel.find({})
        .sort({ 'date_created': -1 })
        .skip((paginationDto.page - 1) * paginationDto.paging)
        .limit((paginationDto.page - 1) * paginationDto.paging + paginationDto.paging)

      const count = await this.supporterModel.countDocuments({})
      return { data: supporters, count }
    } catch (error) {
      throw new HttpException({ error: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

  getSupporterDetails = async (_id: IdDto) => {
    try {
      return await this.supporterModel.findOne({ _id })
    } catch (error) {
      throw new HttpException({ error: error.message }, HttpStatus.BAD_REQUEST)
    }
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
    try {
      return await this.supporterModel.findOneAndUpdate({ _id: editSupporterDto._id }, {
        ...editSupporterDto,
        password: sha1(editSupporterDto.password)
      })
    } catch (error) {
      throw new HttpException({ error: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

  deleteSupporter = async (_id: IdDto) => {
    try {
      return await this.supporterModel.findOneAndDelete({ _id })
    } catch (error) {
      throw new HttpException({ error: error.message }, HttpStatus.BAD_REQUEST)
    }
  }

}
