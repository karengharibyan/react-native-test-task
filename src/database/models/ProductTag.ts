import {Model} from '@nozbe/watermelondb';
import {immutableRelation} from '@nozbe/watermelondb/decorators';
import { Tag } from './Tag';
import { Product } from './Product';

//@ts-expect-error there is a type error in the watermelondb types
export class ProductTag extends Model {
  static table = 'product_tags';
  static associations = {
    tags: {type: 'belongs_to', key: 'tag_id'},
    products: {type: 'belongs_to', key: 'product_id'},
  };
  @immutableRelation('tags', 'tag_id') tag!: Tag;
  @immutableRelation('products', 'product_id') product!: Product;
}
