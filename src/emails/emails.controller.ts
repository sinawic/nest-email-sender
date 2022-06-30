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
import { CreateAttachmentDto, CreateEmailDto, SaveFileDto } from './dto';
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
  async post(@Body() createEmailDto: CreateEmailDto, @GetUser() user, @UploadedFiles() files: Array<CreateAttachmentDto>) {

    const email = await this.emailService.createEmail({
      ...createEmailDto, supporter: user._id, room: user.room
    })

    files && files.map(async (file) => {
      await this.emailService.createAttachment({ ...file, email: email._id })
    })

    return ({ email })
  }


}
