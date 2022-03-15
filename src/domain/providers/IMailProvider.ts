export type MailContact = {
  name: string;
  email: string;
};
export namespace MailProviderDTO {
  export type Input = {
    to: MailContact[];
    subject: string;
    text: string;
  };
}

export interface IMailProvider {
  sendMail(data: MailProviderDTO.Input): Promise<void>;
}
