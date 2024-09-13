import {tableSchema} from '@nozbe/watermelondb';

export const BasketItemsSchema = tableSchema({
  name: 'basket_items',
  columns: [
    {name: 'quantity', type: 'number', isOptional: true},
    {name: 'product_id', type: 'string', isOptional: true},
    {name: 'created_at', type: 'number'},
    {name: 'updated_at', type: 'number'},
  ],
});
