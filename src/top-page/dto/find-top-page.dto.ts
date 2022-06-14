import { IsEnum } from 'class-validator';
import { TopLevelCatE } from '../top-page.model';

export class FindTopPageDto {
  @IsEnum(TopLevelCatE)
  firstCat: TopLevelCatE;
}
