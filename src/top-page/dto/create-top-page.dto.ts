import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { TopLevelCatE } from '../top-page.model';

export class HhDataDto {
  @IsNumber()
  count: number;

  @IsNumber()
  juniorSal: number;

  @IsNumber()
  middleSal: number;

  @IsNumber()
  seniorSal: number;
}

export class TopPageAdvDto {
  @IsString()
  title: string;

  @IsString()
  descr: string;
}

export class TopPageDto {
  @IsEnum(TopLevelCatE)
  firstCat: TopLevelCatE;

  @IsString()
  secondCat: string;

  @IsString()
  alias: string;

  @IsString()
  title: string;

  @IsString()
  category: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => HhDataDto)
  hh?: HhDataDto;

  @IsArray()
  @ValidateNested()
  @Type(() => TopPageAdvDto)
  advantages: TopPageAdvDto[];

  @IsString()
  seoText: string;

  @IsString()
  tagsTitle: string;

  @IsArray()
  @IsString({ each: true })
  tags: string[];
}
