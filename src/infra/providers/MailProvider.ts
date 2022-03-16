import { IMailProvider, MailProviderDTO } from '@/domain/providers/IMailProvider';

export class MailProvider implements IMailProvider {
  async sendMail(data: MailProviderDTO.Input): Promise<void> {
    console.log('Mail sent ', data);
  }
}
