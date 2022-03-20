import { IController } from '@/application/controllers/IController';
import { Request, Response } from 'express';

export function adaptRoute(controller: IController) {
  return async (req: Request, res: Response) => {
    const { body, status } = await controller.handle(req);
    return res.status(status).json(body);
  };
}
