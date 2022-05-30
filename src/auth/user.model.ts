import { prop } from '@typegoose/typegoose';
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses';

// фича, наследуем Base , который автоматом подтягивается в наш класс!
export interface UserModel extends Base {}

export class UserModel extends TimeStamps {
  @prop({
    unique: true,
  })
  email: string;

  @prop()
  passwordHash: string;
}
