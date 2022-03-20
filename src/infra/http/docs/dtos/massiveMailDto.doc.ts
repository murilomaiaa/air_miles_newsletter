export const massiveMail = {
  schema: {
    type: 'object',
    required: true,
    properties: {
      tagName: { type: 'string', required: true },
      subject: { type: 'string', required: true },
      text: { type: 'string', required: true },
    },
  },
  example: {
    tagName: 'visa',
    subject: 'Promoção para cliente Visa',
    text: 'Você cliente Visa, terá direito a 5% extra em milhas vendidas durante esse mês',
  },
};
