import { SendMassiveMailsController } from '@/application/controllers/SendMassiveMailsController';
import { services } from '../services';

export function makeSendMassiveMailsController() {
  const service = services.sendMassiveMail;
  return new SendMassiveMailsController(service);
}
