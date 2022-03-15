import { SendMassiveMail, SendMassiveMailDTO } from '@/domain/features/SendMassiveMail';
import { ITagsRepository } from '@/domain/repositories';
import AppError from '@/main/errors/AppError';
import { Mocked } from '@/tests/helpers/Mocked';
import { makeFakeTag } from '@/tests/helpers/mocks';

describe('SendMassiveMail', () => {
  let systemUnderTests: SendMassiveMail;
  let args: SendMassiveMailDTO.Input;
  let tagsRepository: Mocked<ITagsRepository>;

  beforeAll(() => {
    tagsRepository = {
      findOrCreateByName: jest.fn(),
      findByName: jest.fn().mockImplementation(async name => makeFakeTag(name)),
    };

    args = {
      tagName: 'any_tag',
    };
  });

  beforeEach(() => {
    systemUnderTests = new SendMassiveMail(tagsRepository);
  });

  it('should call findByEmail with correct args', async () => {
    await systemUnderTests.execute(args);

    expect(tagsRepository.findByName).toBeCalledTimes(1);
    expect(tagsRepository.findByName).toBeCalledWith(args.tagName);
  });

  it('should throws if tag is not found', async () => {
    tagsRepository.findByName.mockResolvedValueOnce(undefined);

    const promise = systemUnderTests.execute(args);

    await expect(promise).rejects.toEqual(new AppError('Tag not found'));
  });
});
