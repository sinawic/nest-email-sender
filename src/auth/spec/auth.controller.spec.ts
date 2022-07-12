import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { getModelToken } from '@nestjs/mongoose'
import { Supporter } from '../../supporters/schemas';
import { JwtService } from '@nestjs/jwt';

const mockRepository = {
  find() {
    return {};
  }
}

describe('AuthController', () => {
  let controller: AuthController;
  let spyService: AuthService;

  beforeEach(async () => {

    const AuthServiceProvider = {
      provide: AuthService,
      useFactory: () => ({
        validateLogin: jest.fn(() => ({
          "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmI4NjIyYjViNDA3YzQ2MWYxY2I2ZGUiLCJ1c2VybmFtZSI6InN1cHBwIiwicm9vbSI6IjYyYjg1ZDExNThiNzA3MDM5ZmNiYTFiYyIsImlhdCI6MTY1NzQ1NDE1MCwiZXhwIjoxNjU3NDU1MDUwfQ.-HoNg7upmvPaAYV2WIy92gksJ6bGSFPkYlo1nFjimS0"
        }))
      })
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService, JwtService, AuthServiceProvider,
        { provide: getModelToken(Supporter.name), useValue: mockRepository }
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    spyService = module.get<AuthService>(AuthService);
  });

  describe('root', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });
  })

  describe('login', () => {
    it('should login supporter', async () => {
      const username = 'suppp', password = '15666', room = '62b85d1158b707039fcba1bc'
      controller.post({ username, password, room })
      expect(spyService.validateLogin).toHaveBeenCalled()
      expect(spyService.validateLogin({ username, password, room })).toStrictEqual({
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmI4NjIyYjViNDA3YzQ2MWYxY2I2ZGUiLCJ1c2VybmFtZSI6InN1cHBwIiwicm9vbSI6IjYyYjg1ZDExNThiNzA3MDM5ZmNiYTFiYyIsImlhdCI6MTY1NzQ1NDE1MCwiZXhwIjoxNjU3NDU1MDUwfQ.-HoNg7upmvPaAYV2WIy92gksJ6bGSFPkYlo1nFjimS0"
      })
    });
  })

});