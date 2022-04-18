import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { TopPageController } from './top-page.controller';
import { TopPageModel } from './top-page.model';

@Module({
  controllers: [TopPageController],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: TopPageModel,
        schemaOptions: {
          // if we doesnt name it => collection will use as name a typegooseClass (AuthModel)
          collection: 'TopPage',
        },
      },
    ]),
  ],
})
export class TopPageModule {}
