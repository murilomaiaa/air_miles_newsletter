import { Router } from 'express';
import { makeCreateSubscribersController, makeSendMassiveMailsController } from '@/main/factories/controllers';
import { adaptRoute } from './adaptRoute';

const routes = Router();

const subscriberController = makeCreateSubscribersController();
const sendMassiveMailsController = makeSendMassiveMailsController();

routes.post(subscriberController.path, adaptRoute(subscriberController));

routes.post(sendMassiveMailsController.path, adaptRoute(sendMassiveMailsController));

export default routes;
