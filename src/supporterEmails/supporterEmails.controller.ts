import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtGuard } from '../auth';
import { SupporterEmailsService } from './supporterEmails.service';
import { CreateEmailDto } from './dto';
import { GetUser } from '../supporter/decorator';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

const path = require('path')


@UseGuards(JwtGuard)
@Controller('supporter/sendmail')
export class SupporterEmailsController {
  constructor(private supporterEmailService: SupporterEmailsService) { }

  @Post()
  @UseInterceptors(FilesInterceptor('files', 10, {
    storage: diskStorage({
      destination: './uploads/',
      filename: (req, file, cb) =>
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)),
    })
  }))
  async post(@Body() dto: CreateEmailDto, @GetUser() user, @UploadedFiles() files: Array<Express.Multer.File>) {

    const { to, subject, text } = dto

    const email = await this.supporterEmailService.createEmail({
      to, subject, text, supporter: user._id.toString(), room: user.room.toString()
    })

    files && files.map(async (file) => {
      await this.supporterEmailService.createAttachment({ file, email: email._id })
    })

    return ({ email })
  }


}
