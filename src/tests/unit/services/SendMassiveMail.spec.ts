import { SendMassiveMail, SendMassiveMailDTO } from '@/domain/features/SendMassiveMail';
import { ITagsRepository } from '@/domain/repositories';
import { Mocked } from '@/tests/helpers/Mocked';

describe('SendMassiveMail', () => {
  let systemUnderTests: SendMassiveMail;
  let args: SendMassiveMailDTO.Input;
  let tagsRepository: Mocked<ITagsRepository>;

  beforeAll(() => {
    tagsRepository = {
      findOrCreateByName: jest.fn(),
      findByName: jest.fn(),
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
});
