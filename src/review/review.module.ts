import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { ReviewController } from './review.controller';
import { ReviewModel } from './review.model';
import { ReviewService } from './review.service';

@Module({
  controllers: [ReviewController],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: ReviewModel,
        schemaOptions: {
          // if we doesnt name it => collection will use as name a typegooseClass (AuthModel)
          collection: 'Review',
        },
      },
    ]),
  ],
  providers: [ReviewService],
})
export class ReviewModule {}
