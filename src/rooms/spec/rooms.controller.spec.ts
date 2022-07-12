import { Test, TestingModule } from '@nestjs/testing';
import { RoomsController } from '../rooms.controller';
import { RoomsService } from '../rooms.service';
import { getModelToken } from '@nestjs/mongoose'
import { Room } from '../schemas';
import { IdDto, PaginationDto } from '../../common/dto';
import { CreateRoomDto } from '../dto';

const mockRepository = {
  find() {
    return {};
  }
}

const roomsListData = [{
  "_id": "62b9c43c48c1cd5b0dd1f741",
  "name": "xxxx",
  "email": "xxxx@gmail.com",
  "website": "xxxx.com",
  "date_created": "2022-06-27T14:52:44.074Z",
  "__v": 0
}]
const roomsDetailData = roomsListData[0]


describe('RoomsController', () => {
  let controller: RoomsController;
  let spyService: RoomsService;

  beforeEach(async () => {

    const RoomsServiceProvider = {
      provide: RoomsService,
      useFactory: () => ({
        getRooms: jest.fn(() => roomsListData),
        getRoomDetails: jest.fn(() => roomsDetailData),
        createRoom: jest.fn(() => roomsDetailData),
        editRoom: jest.fn(() => roomsDetailData),
        deleteRoom: jest.fn(() => roomsDetailData),
      })
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomsController],
      providers: [
        RoomsService, RoomsServiceProvider,
        { provide: getModelToken(Room.name), useValue: mockRepository }
      ],
    }).compile();

    controller = module.get<RoomsController>(RoomsController);
    spyService = module.get<RoomsService>(RoomsService);
  });

  describe('root', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });
  })

  describe('getList', () => {
    it('should get room list', async () => {
      const paginationDto: PaginationDto = { page: 1, paging: 2 }
      controller.getList(paginationDto.page, paginationDto.paging)
      expect(spyService.getRooms).toHaveBeenCalled()
      expect(spyService.getRooms(paginationDto)).toBe(roomsListData)
    });
  })

  describe('getRoomDetails', () => {
    it('should get room details', async () => {
      const _id = new IdDto()
      _id._id = '62b9c43c48c1cd5b0dd1f741'
      controller.getById(_id)
      expect(spyService.getRoomDetails).toHaveBeenCalled()
      expect(spyService.getRoomDetails(_id)).toBe(roomsDetailData)
    });
  })

  describe('createRoom', () => {
    it('should create room', async () => {
      const createRoomDto: CreateRoomDto = {
        "name": "qqqqwq",
        "email": "qqqq@gmail.com",
        "website": "qqqq.com"
      }
      controller.post(createRoomDto)
      expect(spyService.createRoom).toHaveBeenCalled()
      expect(spyService.createRoom(createRoomDto)).toBe(roomsDetailData)
    });
  })

  describe('editRoom', () => {
    it('should edit room', async () => {
      const _id = new IdDto()
      _id._id = '62cae2cbc30a9d0be1dac97a'
      const createRoomDto: CreateRoomDto = {
        "name": "qqqqwq",
        "email": "qqqq@gmail.com",
        "website": "qqqq.com"
      }
      controller.put(_id, createRoomDto)
      expect(spyService.editRoom).toHaveBeenCalled()
      expect(spyService.editRoom({ _id, ...createRoomDto })).toBe(roomsDetailData)
    });
  })

  describe('deleteRoom', () => {
    it('should delete room', async () => {
      const _id = new IdDto()
      _id._id = '62b9c43c48c1cd5b0dd1f741'
      controller.delete(_id)
      expect(spyService.deleteRoom).toHaveBeenCalled()
      expect(spyService.deleteRoom(_id)).toBe(roomsDetailData)
    });
  })

});