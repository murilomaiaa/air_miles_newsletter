import { makeSendMassiveMailsController } from '@/main/factories/controllers';
import { massiveMail } from '../dtos/massiveMailDto.doc';
import { make201, make400, make500 } from '../responses.doc';

export const massiveMailRoute = {
  [makeSendMassiveMailsController().path]: {
    post: {
      tags: ['MassiveMails'],
      summary: 'Send email to all subscriber of one tag',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: massiveMail.schema,
            example: massiveMail.example,
          },
        },
      },
      responses: {
        '201': make201({
          type: 'object',
          properties: {
            numberOfSubscribers: {
              type: 'number',
              example: 78,
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
              example: 'Tag not found',
            },
          },
        }),
        '500': make500(),
      },
    },
  },
};
