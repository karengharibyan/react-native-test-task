import {tableSchema} from '@nozbe/watermelondb';

export const ProductTagsSchema = tableSchema({
  name: 'product_tags',
  columns: [
    {name: 'tag_id', type: 'string', isIndexed: true},
    {name: 'product_id', type: 'string', isOptional: true},
    {name: 'created_at', type: 'number'},
    {name: 'updated_at', type: 'number'},
  ],
});
