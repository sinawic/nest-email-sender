import { Module } from '@nestjs/common';
import { SupporterController } from './supporter.controller';
import { SupporterService } from './supporter.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({})],
  controllers: [SupporterController],
  providers: [SupporterService]
})
export class SupporterModule { }
