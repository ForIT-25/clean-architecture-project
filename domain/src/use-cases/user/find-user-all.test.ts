import { describe, test, expect, beforeEach } from 'vitest';
import { findUserAll } from './find-user-all';
import { createMockUserService, MockedUserService, MockUser } from './mocks/user-service-mock'; 

describe('findUserAll', () => {
  let mockService: MockedUserService;

  beforeEach(() => {
    mockService = createMockUserService();
    mockService.findUserAll.mockClear(); 
  });

  test('Returns a list of users', async () => {
    const anotherUser = { ...MockUser, id: 'MOCK-U2', email: 'second@hotel.com' };
    const expectedUsers = [MockUser, anotherUser];
    
    mockService.findUserAll.mockResolvedValue(expectedUsers);

    const result = await findUserAll(mockService);

    expect(mockService.findUserAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expectedUsers);
    expect(result.length).toBe(2);
  });
  
  test('Returns an empty array if there are no users', async () => {
    mockService.findUserAll.mockResolvedValue([]);

    const result = await findUserAll(mockService);

    expect(mockService.findUserAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual([]);
    expect(result.length).toBe(0);
  });
});
