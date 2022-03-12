import { makeCreateSubscribersController } from '@/main/factories/controllers/makeCreateSubscribersController';
import { subscriber } from '../dtos/subscriberDto.doc';
import { make201, make400, make500 } from '../responses.doc';

export const subscribersRoute = {
  [makeCreateSubscribersController().path]: {
    post: {
      tags: ['Subscribers'],
      summary: 'Create a new subscriber',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: subscriber.schema,
            example: subscriber.example,
          },
        },
      },
      responses: {
        '201': make201({
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: 'b765ae09-012a-420e-96c2-ad5f0f0f9019',
            },
          },
        }),
        '400': make400({
          type: 'object',
          properties: {
            status: {
              type: 'string',
              example: 'error',
            },
            message: {
              type: 'string',
              example: 'Email already used',
            },
          },
        }),
        '500': make500(),
      },
    },
  },
};
