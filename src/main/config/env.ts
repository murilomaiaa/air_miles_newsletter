const env = {
  db: {
    host: process.env.DB_HOST as string,
    port: (process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined) as number,
    username: process.env.DB_USERNAME as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DB_DATABASE as string,
  },
  queue: {
    host: process.env.RABBITMQ_HOST as string,
    port: (process.env.RABBITMQ_PORT ? Number(process.env.RABBITMQ_PORT) : undefined) as number,
    username: process.env.RABBITMQ_USER as string,
    password: process.env.RABBITMQ_PASSWORD as string,
  },
  apiPort: process.env.PORT ?? 3334,
};

function validateEnvs(object: Record<string, unknown>) {
  const validate = (o: Record<string, unknown>) =>
    Object.keys(o).forEach(key => {
      if (o[key] == undefined) throw new Error(`Env ${key} was not found`);
    });

  Object.keys(object).forEach(key => {
    if (typeof object[key] === 'object') {
      validate(object[key] as Record<string, unknown>);
    }
  });
}

validateEnvs(env);

export default env;
