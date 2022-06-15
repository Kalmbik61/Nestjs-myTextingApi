import { prop, index } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export enum TopLevelCatE {
  Courses,
  Services,
  Books,
  Products,
}

export class HhData {
  @prop()
  count: number;

  @prop()
  juniorSal: number;

  @prop()
  middleSal: number;

  @prop()
  seniorSal: number;
}

export class TopPageAdv {
  @prop()
  title: string;

  @prop()
  descr: string;
}

export interface TopPageModel extends Base {}

@index({ title: 'text', seoText: 'text' })
export class TopPageModel extends TimeStamps {
  @prop({ enum: TopLevelCatE })
  firstCat: TopLevelCatE;

  @prop()
  secondCat: string;

  @prop({ unique: true })
  alias: string;

  @prop()
  title: string;

  @prop()
  category: string;

  @prop({ type: () => HhData })
  hh?: HhData;

  @prop({ type: () => [TopPageAdv] })
  advantages: TopPageAdv[];

  @prop()
  seoText: string;

  @prop()
  tagsTitle: string;

  @prop({ type: () => [String] })
  tags: string[];
}
