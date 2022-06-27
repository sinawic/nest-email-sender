import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtGuard } from '../auth/Guard';
import { EmailsService } from './emails.service';
import { CreateEmailDto } from './dto';
import { GetUser } from '../auth/decorator';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

const path = require('path')


@UseGuards(JwtGuard)
@Controller('supporter/sendmail')
export class EmailsController {
  constructor(private emailService: EmailsService) { }

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

    const email = await this.emailService.createEmail({
      to, subject, text, supporter: user._id.toString(), room: user.room.toString()
    })

    files && files.map(async (file) => {
      await this.emailService.createAttachment({ file, email: email._id })
    })

    return ({ email })
  }


}
