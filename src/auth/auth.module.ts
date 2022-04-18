import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { AuthController } from './auth.controller';
import { AuthModel } from './auth.model';

@Module({
  controllers: [AuthController],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: AuthModel,
        schemaOptions: {
          // if we doesnt name it => collection will use as name a typegooseClass (AuthModel)
          collection: 'Auth',
        },
      },
    ]),
  ],
})
export class AuthModule {}
