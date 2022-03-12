import { tag } from './tagDto.doc';

export const subscriber = {
  schema: {
    type: 'object',
    required: true,
    properties: {
      name: { type: 'string', required: true },
      email: { type: 'string', required: true },
      idAtCore: { type: 'string', required: true },
      tag: tag.dto,
    },
  },
  example: {
    name: 'Alan Turing',
    email: 'alan@mail.com',
    idAtCore: 'b6c4df6d-2757-4e7b-944e-77475885f065',
    tag: tag.example,
  },
};
