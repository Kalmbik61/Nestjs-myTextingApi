import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateReviewDto } from './dto/createReview.dto';
import { REVIEW_NOT_FOUND } from './review.conts';
import { ReviewModel } from './review.model';
import { ReviewService } from './review.service';

class Leak {}

const l = [];

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewServ: ReviewService) {}

  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() dto: CreateReviewDto) {
    return this.reviewServ.create(dto);
  }

  @Delete('id')
  async delete(@Param() id: string) {
    const deletedDoc = await this.reviewServ.delete(id);
    if (!deletedDoc) {
      throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }

  @Get('byProduct/:productId')
  async getByProduct(@Param('productId') productId: string) {
    return this.reviewServ.findByProductId(productId);
  }
}
