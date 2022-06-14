import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { IdValidationPipe } from 'src/pipes/idValidation.pipe';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { UserEmail } from '../decorators/user_email.decorator';
import { CreateReviewDto } from './dto/createReview.dto';
import { REVIEW_NOT_FOUND } from './review.conts';
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

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param() id: string, @UserEmail() email: string) {
    const deletedDoc = await this.reviewServ.delete(id);
    if (!deletedDoc) {
      throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }

  // @Get('id')
  // async findByProduct(@Param() id: string) {
  //   const product = await this.reviewServ.findByProductId(id);
  //   if (!product) {
  //     throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
  //   }
  //   return product;
  // }

  @UseGuards(JwtAuthGuard)
  @Get('byProduct/:productId')
  async getByProduct(
    @Param('productId', IdValidationPipe) productId: string,
    @UserEmail() email: string,
  ) {
    return this.reviewServ.findByProductId(productId);
  }
}
