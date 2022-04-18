import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { AuthModel } from 'src/auth/auth.model';
import { ProductController } from './product.controller';
import { ProductModel } from './product.model';

@Module({
  controllers: [ProductController],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: ProductModel,
        schemaOptions: {
          // if we doesnt name it => collection will use as name a typegooseClass (AuthModel)
          collection: 'Product',
        },
      },
    ]),
  ],
})
export class ProductModule {}
