import {
  Body,
  Controller,
  Get,
  Patch,
  UseGuards,
} from '@nestjs/common';
// import { User } from '@prisma/client';
// import { GetUser } from '../auth/decorator';
// import { JwtGuard } from '../auth/guard';
// import { EditUserDto } from './dto';
import { AdminService } from './admin.service';

// @UseGuards(JwtGuard)
@Controller('admin')
export class AdminController {
  constructor(private userService: AdminService) { }
  @Get()
  getMe() {
    return { 'user': 'user' };
  }

}
