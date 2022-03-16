import { Router } from 'express';
import { makeCreateSubscribersController, makeSendMassiveMailsController } from '@/main/factories/controllers';

const routes = Router();

const subscriberController = makeCreateSubscribersController();
const sendMassiveMailsController = makeSendMassiveMailsController();

routes.post(subscriberController.path, async (req, res) => {
  const { body, status } = await subscriberController.handle(req);
  return res.status(status).json(body);
});

routes.post(sendMassiveMailsController.path, async (req, res) => {
  const { body, status } = await sendMassiveMailsController.handle(req);
  return res.status(status).json(body);
});

export default routes;
