import { prop } from '@typegoose/typegoose';
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses';

// фича, наследуем Base , который автоматом подтягивается в наш класс!
export interface AuthModel extends Base {}

export class AuthModel extends TimeStamps {
  @prop({
    unique: true,
  })
  email: string;

  @prop()
  passwordHash: string;
}
