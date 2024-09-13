import {Model} from '@nozbe/watermelondb';
import {date, field, readonly} from '@nozbe/watermelondb/decorators';

//@ts-expect-error there is a type error in the watermelondb types
export class Tag extends Model {
  static table = 'tags';

  static associations = {
    product_tags: {type: 'has_many', foreignKey: 'tag_id'},
  };

  @field('name') name!: string;

  // Optional readonly fields
  @readonly @date('created_at') createdAt!: number;
  @readonly @date('updated_at') updatedAt!: number;
}
