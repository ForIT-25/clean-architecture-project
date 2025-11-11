import { describe, test, expect, beforeEach } from 'vitest';
import { findUserByEmail } from './find-user-by-email';
import { createMockUserService, MockedUserService, MockUser } from './mocks/user-service-mock';

describe('findUserByEmail', () => {
  let mockService: MockedUserService;
  const existingEmail = MockUser.email;
  const nonExistentEmail = 'missing@email.com';

  beforeEach(() => {
    mockService = createMockUserService();
    mockService.findUserByEmail.mockClear(); 
  });

  test('Returns the user if the email exists', async () => {
    mockService.findUserByEmail.mockResolvedValue(MockUser);

    const result = await findUserByEmail(mockService, existingEmail);

    expect(mockService.findUserByEmail).toHaveBeenCalledWith(existingEmail);
    expect(result).toEqual(MockUser);
  });

  test('Returns undefined if the email does not exist', async () => {
    mockService.findUserByEmail.mockResolvedValue(undefined);

    const result = await findUserByEmail(mockService, nonExistentEmail);

    expect(mockService.findUserByEmail).toHaveBeenCalledWith(nonExistentEmail);
    expect(result).toBeUndefined();
  });

  test('It throws an error if the email format is invalid.', async () => {
    const invalidEmails = ['user@domain', 'user@.com', 'user', ''];

    for (const email of invalidEmails) {
        await expect(findUserByEmail(mockService, email)).rejects.toThrow(
            'Invalid email format.'
        );
    }
    expect(mockService.findUserByEmail).not.toHaveBeenCalled();
  });
});
