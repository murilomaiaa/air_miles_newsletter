import { SendMassiveMail, SendMassiveMailDTO } from '@/domain/features/SendMassiveMail';
import { ISubscribersRepository, ITagsRepository } from '@/domain/repositories';
import AppError from '@/main/errors/AppError';
import { Mocked } from '@/tests/helpers/Mocked';
import { makeFakeSubscriber, makeFakeTag } from '@/tests/helpers/mocks';

describe('SendMassiveMail', () => {
  let systemUnderTests: SendMassiveMail;
  let args: SendMassiveMailDTO.Input;
  let tagsRepository: Mocked<ITagsRepository>;
  let subscribersRepository: Mocked<ISubscribersRepository>;

  beforeAll(() => {
    tagsRepository = {
      findOrCreateByName: jest.fn(),
      findByName: jest.fn().mockImplementation(async name => makeFakeTag(name)),
    };

    subscribersRepository = {
      findByEmail: jest.fn(),
      save: jest.fn(),
      findByTagName: jest.fn().mockResolvedValue([makeFakeSubscriber()]),
    };

    args = {
      tagName: 'any_tag',
    };
  });

  beforeEach(() => {
    systemUnderTests = new SendMassiveMail(tagsRepository, subscribersRepository);
  });

  it('should call findByName with correct args', async () => {
    await systemUnderTests.execute(args);

    expect(tagsRepository.findByName).toBeCalledTimes(1);
    expect(tagsRepository.findByName).toBeCalledWith(args.tagName);
  });

  it('should throws if tag is not found', async () => {
    tagsRepository.findByName.mockResolvedValueOnce(undefined);

    const promise = systemUnderTests.execute(args);

    await expect(promise).rejects.toEqual(new AppError('Tag not found'));
  });

  it('should call findByTagName with correct args', async () => {
    await systemUnderTests.execute(args);

    expect(subscribersRepository.findByTagName).toBeCalledTimes(1);
    expect(subscribersRepository.findByTagName).toBeCalledWith(args.tagName);
  });
});
