import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';

describe('AppController', () => {
  let controller: AppController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();

    controller = module.get<AppController>(AppController);
  });

  it('should return service info', () => {
    const result = controller.getRoot();
    expect(result.service).toBe('notification-platform');
    expect(result.version).toBe('0.1.0');
  });
});
