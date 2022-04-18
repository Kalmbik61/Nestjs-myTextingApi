import { ConfigService } from '@nestjs/config';
import { TypegooseModuleOptions } from 'nestjs-typegoose';
import { ENV_MONGO } from './config';

export const getMongoConfig = async (
  configService: ConfigService,
): Promise<TypegooseModuleOptions> => {
  return {
    uri: getMongoString(configService),
    ...getMongoOptions(),
  };
};

//mongo uri
const getMongoString = (configService: ConfigService) =>
  'mongodb://' +
  configService.get(ENV_MONGO.MONGO_LOGIN) +
  ':' +
  configService.get(ENV_MONGO.MONGO_PASS) +
  '@' +
  configService.get(ENV_MONGO.MONGO_HOST) +
  ':' +
  configService.get(ENV_MONGO.MONGO_PORT) +
  '/' +
  configService.get(ENV_MONGO.MONGO_AUTH_DATAGASE);

// mongo other options
const getMongoOptions = () => ({
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
