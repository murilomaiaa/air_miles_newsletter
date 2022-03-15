import { Subscriber } from '@/domain/entities';
import { SendMassiveMail, SendMassiveMailDTO } from '@/domain/features/SendMassiveMail';
import { IMailProvider } from '@/domain/providers/IMailProvider';
import { ISubscribersRepository, ITagsRepository } from '@/domain/repositories';
import AppError from '@/main/errors/AppError';
import { Mocked } from '@/tests/helpers/Mocked';
import { makeFakeSubscriber, makeFakeTag } from '@/tests/helpers/mocks';

describe('SendMassiveMail', () => {
  let systemUnderTests: SendMassiveMail;
  let args: SendMassiveMailDTO.Input;
  let tagsRepository: Mocked<ITagsRepository>;
  let subscribersRepository: Mocked<ISubscribersRepository>;
  let mailProvider: Mocked<IMailProvider>;

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

    mailProvider = { sendMail: jest.fn() };

    args = {
      tagName: 'any_tag',
      subject: 'Subject',
      text: 'Text',
    };
  });

  beforeEach(() => {
    systemUnderTests = new SendMassiveMail(tagsRepository, subscribersRepository, mailProvider);
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

  it('should call sendMail with all subscribers', async () => {
    const s1 = makeFakeSubscriber();
    const s2 = new Subscriber({
      id: '7925d676-0441-4dc7-8a98-00749dcd0725',
      email: 'any-email2',
      name: 'any-name2',
      idAtCore: 'any_id_at_core2',
      tag: { name: 'any-tag', id: 'cb2a43e8-e092-4b23-a2d3-0de376f8632d' },
    });
    subscribersRepository.findByTagName.mockResolvedValueOnce([s1, s2]);

    await systemUnderTests.execute(args);

    expect(mailProvider.sendMail).toBeCalledTimes(1);
    expect(mailProvider.sendMail).toBeCalledWith({
      subject: args.subject,
      text: args.text,
      to: [
        {
          email: s1.getEmail(),
          name: s1.getName(),
        },
        {
          email: s2.getEmail(),
          name: s2.getName(),
        },
      ],
    });
  });
});
