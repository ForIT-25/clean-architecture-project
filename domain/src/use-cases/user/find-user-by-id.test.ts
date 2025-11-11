import { describe, test, expect, beforeEach } from 'vitest';
import { findUserById } from './find-user-by-id';
import { createMockUserService, MockedUserService, MockUser } from './mocks/user-service-mock';

describe('findUserById', () => {
  let mockService: MockedUserService;
  const existingUserId = MockUser.id;
  const nonExistentUserId = 'NON-EXISTENT-ID';

  beforeEach(() => {
    mockService = createMockUserService();
    mockService.findUserById.mockClear(); 
  });

  test('Return the user if the ID exists', async () => {
    mockService.findUserById.mockResolvedValue(MockUser);

    const result = await findUserById(mockService, existingUserId);

    expect(mockService.findUserById).toHaveBeenCalledWith(existingUserId);
    expect(result).toEqual(MockUser);
  });

  test('Return undefined if the ID does not exist', async () => {
    mockService.findUserById.mockResolvedValue(undefined);

    const result = await findUserById(mockService, nonExistentUserId);

    expect(mockService.findUserById).toHaveBeenCalledWith(nonExistentUserId);
    expect(result).toBeUndefined();
  });
});
