import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { db_connection } from './db/db';
import { MailsService } from './mailService/mailService';
import { SupporterEmailsModels } from './supporterEmails/supporterEmails.models';

db_connection()

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  )

  await app.listen(process.env.PORT || 3000);
}
bootstrap();

const mailsService = new MailsService(new SupporterEmailsModels)
mailsService.init()
