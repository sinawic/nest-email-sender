import { Test, TestingModule } from '@nestjs/testing';
import { SupportersController } from '../supporters.controller';
import { SupportersService } from '../supporters.service';
import { getModelToken } from '@nestjs/mongoose'
import { Supporter } from '../schemas';
import { IdDto, PaginationDto } from '../../common/dto';
import { CreateSupporterDto } from '../dto';

const mockRepository = {
  find() {
    return {};
  }
}

const supportersListData = [{
  "_id": "62c1900bcf7c37cd33c77a4f",
  "username": "qqqqqq",
  "password": "cbe59cfec783a619d1b9e2892ed9caf16c390a82",
  "active": true,
  "room": "62b9c43c48c1cd5b0dd1f741",
  "date_created": "2022-07-03T12:48:11.266Z",
  "__v": 0
}]
const supportersDetailData = supportersListData[0]


describe('SupportersController', () => {
  let controller: SupportersController;
  let spyService: SupportersService;

  beforeEach(async () => {

    const SupportersServiceProvider = {
      provide: SupportersService,
      useFactory: () => ({
        getSupporters: jest.fn(() => supportersListData),
        getSupporterDetails: jest.fn(() => supportersDetailData),
        createSupporter: jest.fn(() => supportersDetailData),
        editSupporter: jest.fn(() => supportersDetailData),
        deleteSupporter: jest.fn(() => supportersDetailData),
      })
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [SupportersController],
      providers: [
        SupportersService, SupportersServiceProvider,
        { provide: getModelToken(Supporter.name), useValue: mockRepository }
      ],
    }).compile();

    controller = module.get<SupportersController>(SupportersController);
    spyService = module.get<SupportersService>(SupportersService);
  });

  describe('root', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });
  })

  describe('getList', () => {
    it('should get supporter list', async () => {
      const paginationDto: PaginationDto = { page: 1, paging: 2 }
      controller.getList(paginationDto.page, paginationDto.paging)
      expect(spyService.getSupporters).toHaveBeenCalled()
      expect(spyService.getSupporters(paginationDto)).toBe(supportersListData)
    });
  })

  describe('getSupporterDetails', () => {
    it('should get supporter details', async () => {
      const _id = new IdDto()
      _id._id = '62b9c43c48c1cd5b0dd1f741'
      controller.getById(_id)
      expect(spyService.getSupporterDetails).toHaveBeenCalled()
      expect(spyService.getSupporterDetails(_id)).toBe(supportersDetailData)
    });
  })

  describe('createSupporter', () => {
    it('should create supporter', async () => {
      const createSupporterDto: CreateSupporterDto = {
        "username": "qqqqqq",
        "password": "15666",
        "room": "62b9c43c48c1cd5b0dd1f741"
      }
      controller.post(createSupporterDto)
      expect(spyService.createSupporter).toHaveBeenCalled()
      expect(spyService.createSupporter(createSupporterDto)).toBe(supportersDetailData)
    });
  })

  describe('editSupporter', () => {
    it('should edit supporter', async () => {
      const _id = new IdDto()
      _id._id = '62cae2cbc30a9d0be1dac97a'
      const createSupporterDto: CreateSupporterDto = {
        "username": "qqqqqq",
        "password": "15666",
        "room": "62b9c43c48c1cd5b0dd1f741"
      }
      controller.put(_id, createSupporterDto)
      expect(spyService.editSupporter).toHaveBeenCalled()
      expect(spyService.editSupporter({ _id, ...createSupporterDto })).toBe(supportersDetailData)
    });
  })

  describe('deleteSupporter', () => {
    it('should delete supporter', async () => {
      const _id = new IdDto()
      _id._id = '62b9c43c48c1cd5b0dd1f741'
      controller.delete(_id)
      expect(spyService.deleteSupporter).toHaveBeenCalled()
      expect(spyService.deleteSupporter(_id)).toBe(supportersDetailData)
    });
  })

});