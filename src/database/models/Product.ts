import {Model, Q} from '@nozbe/watermelondb';
import {
  date,
  field,
  json,
  lazy,
  readonly,
} from '@nozbe/watermelondb/decorators';
import {sanitizeJsonData} from '../sanitizers';

//@ts-expect-error there is a type error in the watermelondb types
export class Product extends Model {
  static table = 'products';

  static associations = {
    tags: {type: 'has_many', foreignKey: 'product_id'},
  };

  @field('title') title!: string;
  @field('description') description!: string;
  @field('discountPercentage') discountPercentage!: number;
  @field('stock') stock!: number;
  @field('rating') rating!: number;
  @field('price') price!: number;
  @field('sku') sku!: string;
  @field('availabilityStatus') availabilityStatus!: string;
  @json('images', sanitizeJsonData) images!: string[];
  @field('thumbnail') thumbnail!: string;

  @lazy
  tags = this.collections
    .get('tags')
    .query(Q.on('product_tags', 'product_id', this.id));

  // Optional readonly fields
  @readonly @date('created_at') createdAt!: number;
  @readonly @date('updated_at') updatedAt!: number;
}
