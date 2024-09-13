import {Model} from '@nozbe/watermelondb';
import {field, relation} from '@nozbe/watermelondb/decorators';
import {Product} from './Product';

export class BasketItem extends Model {
  static table = 'basket_items';

  @field('quantity') quantity!: number;
  @relation('products', 'product_id') product!: Product;
}
