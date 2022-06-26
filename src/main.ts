import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { AppModule } from './app.module';
import { db_connection } from './db/db';
import { MailsService } from './supporterEmails/mail.service';
import { Email } from './supporterEmails/schemas';

// db_connection()

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  )

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
