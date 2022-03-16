import { MailProvider } from '@/infra/providers/MailProvider';

export const providers = {
  IMailProvider: new MailProvider(),
};
