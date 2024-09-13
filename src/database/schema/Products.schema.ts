import {tableSchema} from '@nozbe/watermelondb';

export const ProductsSchema = tableSchema({
  name: 'products',
  columns: [
    {name: 'title', type: 'string', isOptional: true},
    {name: 'description', type: 'string', isOptional: true},
    {name: 'discountPercentage', type: 'number', isOptional: true},
    {name: 'stock', type: 'number', isOptional: true},
    {name: 'rating', type: 'number', isOptional: true},
    {name: 'price', type: 'number', isOptional: true},
    {name: 'sku', type: 'string', isOptional: true},
    {name: 'availabilityStatus', type: 'string', isOptional: true},
    {name: 'images', type: 'string', isOptional: true},
    {name: 'thumbnail', type: 'string', isOptional: true},
    {name: 'created_at', type: 'number'},
    {name: 'updated_at', type: 'number'},
  ],
});
