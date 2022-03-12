import { Subscriber } from '@/domain/entities';
import { CreateSubscriber, CreateSubscriberDTO } from '@/domain/features/CreateSubscriber';
import { ISubscribersRepository, ITagsRepository } from '@/domain/repositories';
import AppError from '@/main/errors/AppError';
import { Mocked } from '@/tests/helpers/Mocked';
import { makeFakeSubscriber, makeFakeTag } from '@/tests/helpers/mocks';

describe('CreateSubscriber', () => {
  let systemUnderTests: CreateSubscriber;
  let args: CreateSubscriberDTO.Input;
  let subscribersRepository: Mocked<ISubscribersRepository>;
  let tagsRepository: Mocked<ITagsRepository>;

  beforeAll(() => {
    subscribersRepository = {
      findByEmail: jest.fn().mockResolvedValue(undefined),
      save: jest.fn().mockImplementation(async subscriber => subscriber),
    };

    tagsRepository = {
      findOrCreateByName: jest.fn().mockImplementation(async name => makeFakeTag(name)),
    };

    args = {
      email: 'any@mail.com',
      name: 'any_name',
      idAtCore: 'any_id_at_core',
      tag: {
        name: 'any_tag',
      },
    };
  });

  beforeEach(() => {
    systemUnderTests = new CreateSubscriber(subscribersRepository, tagsRepository);
  });

  it('should call findByEmail with correct args', async () => {
    await systemUnderTests.execute(args);

    expect(subscribersRepository.findByEmail).toBeCalledTimes(1);
    expect(subscribersRepository.findByEmail).toBeCalledWith(args.email);
  });

  it('should throws if email is already registered', async () => {
    subscribersRepository.findByEmail.mockResolvedValueOnce(makeFakeSubscriber());

    const promise = systemUnderTests.execute(args);

    await expect(promise).rejects.toEqual(new AppError('Email already used'));
  });

  it('should call findOrCreateByName with correct args', async () => {
    await systemUnderTests.execute(args);

    expect(tagsRepository.findOrCreateByName).toBeCalledTimes(1);
    expect(tagsRepository.findOrCreateByName).toBeCalledWith(args.tag.name);
  });
  it('should save subscriber with correct args', async () => {
    const subscriber = new Subscriber({
      email: args.email,
      name: args.name,
      idAtCore: args.idAtCore,
      tag: makeFakeTag(args.tag.name),
    });

    await systemUnderTests.execute(args);

    expect(subscribersRepository.save).toBeCalledTimes(1);
    expect(subscribersRepository.save).toBeCalledWith({
      ...subscriber,
      id: expect.any(String),
      tag: {
        ...makeFakeTag(args.tag.name),
        createdAt: expect.any(Date),
      },
    });
  });

  it('should return the created subscriber', async () => {
    const subscriber = makeFakeSubscriber();
    subscribersRepository.save.mockResolvedValueOnce(subscriber);

    const response = await systemUnderTests.execute(args);

    expect(response).toEqual(subscriber);
  });
});
