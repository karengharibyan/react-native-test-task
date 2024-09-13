import {tableSchema} from '@nozbe/watermelondb';

export const TagsSchema = tableSchema({
  name: 'tags',
  columns: [
    {name: 'name', type: 'string', isOptional: true},
    {name: 'created_at', type: 'number'},
    {name: 'updated_at', type: 'number'},
  ],
});
