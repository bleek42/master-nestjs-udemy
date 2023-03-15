import { DatabaseConfigService } from '../database/typeorm.service';

describe('ConfigUtil', () => {
  it('should be defined', () => {
    expect(new DatabaseConfigService()).toBeDefined();
  });
});
