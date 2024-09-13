import {Model} from '@nozbe/watermelondb';
import {date, field, readonly} from '@nozbe/watermelondb/decorators';

export class Tag extends Model {
  static table = 'tags';

  @field('name') name!: string;

  // Optional readonly fields
  @readonly @date('created_at') createdAt!: number;
  @readonly @date('updated_at') updatedAt!: number;
}
