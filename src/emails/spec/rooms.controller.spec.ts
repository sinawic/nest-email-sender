import { Test, TestingModule } from '@nestjs/testing';
import { EmailsController } from '../emails.controller';
import { EmailsService } from '../emails.service';
import { getModelToken } from '@nestjs/mongoose'
import { Email, Attachment } from '../schemas';
import { SaveEmailDto } from '../dto';

const mockRepository = {
  find() {
    return {};
  }
}

const emailData = {
  "email": {
    "to": "sinawic9@gmail.com",
    "subject": "somessss",
    "text": "<b>aaa</b>",
    "sent": false,
    "room": "62b85d1158b707039fcba1bc",
    "supporter": "62b8622b5b407c461f1cb6de",
    "date_created": "2022-07-10T15:12:35.674Z",
    "_id": "62caec63f9f22f429765388c",
    "__v": 0
  }
}


describe('EmailsController', () => {
  let controller: EmailsController;
  let spyService: EmailsService;

  beforeEach(async () => {

    const EmailsServiceProvider = {
      provide: EmailsService,
      useFactory: () => ({
        createEmail: jest.fn(() => emailData),
      })
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmailsController],
      providers: [
        EmailsService, EmailsServiceProvider,
        { provide: getModelToken(Email.name), useValue: mockRepository },
        { provide: getModelToken(Attachment.name), useValue: mockRepository }
      ],
    }).compile();

    controller = module.get<EmailsController>(EmailsController);
    spyService = module.get<EmailsService>(EmailsService);
  });

  describe('root', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });
  })

  describe('createEmail', () => {
    it('should create email', async () => {
      const saveEmailDto: SaveEmailDto = {
        "to": "sinawic9@gmail.com",
        "subject": "somessss",
        "text": "<b>aaa</b>",
        "supporter": { _id: '62c1900bcf7c37cd33c77a4f' },
        "room": { _id: '62b9c43c48c1cd5b0dd1f741' }
      },
        user = { _id: '62c1900bcf7c37cd33c77a4f', room: '62b9c43c48c1cd5b0dd1f741' },
        files = []
      controller.post(saveEmailDto, user, files)
      expect(spyService.createEmail).toHaveBeenCalled()
      expect(spyService.createEmail(saveEmailDto)).toBe(emailData)
    });
  })

});