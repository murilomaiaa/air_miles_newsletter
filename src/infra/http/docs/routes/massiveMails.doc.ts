import { makeSendMassiveMailsController } from '@/main/factories/controllers';
import { subscriber } from '../dtos/subscriberDto.doc';
import { make201, make400, make500 } from '../responses.doc';

export const subscribersRoute = {
  [makeSendMassiveMailsController().path]: {
    post: {
      tags: ['MassiveMails'],
      summary: 'Send email to all subscriber of one tag',
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
