import { Router } from 'express';
import { makeCreateSubscribersController } from '@/main/factories/controllers/makeCreateSubscribersController';

const routes = Router();

const controller = makeCreateSubscribersController();

routes.post(controller.path, async (req, res) => {
  const { body, status } = await controller.handle(req);
  return res.status(status).json(body);
});

export default routes;
