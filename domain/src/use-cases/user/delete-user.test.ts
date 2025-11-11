import { describe, test, expect, beforeEach } from 'vitest';
import { deleteUser } from './delete-user';
import { createMockUserService, MockedUserService, MockUser } from './mocks/user-service-mock';

describe('deleteUser', () => {
  let mockService: MockedUserService;
  const userId = MockUser.id;

  beforeEach(() => {
    mockService = createMockUserService();
    mockService.deleteUser.mockClear();
  });

  test('Delete user by ID', async () => {
    mockService.deleteUser.mockResolvedValue(undefined);

    await deleteUser(mockService, userId);

    expect(mockService.deleteUser).toHaveBeenCalledWith(userId);
    expect(mockService.deleteUser).toHaveBeenCalledTimes(1);
  });
});
