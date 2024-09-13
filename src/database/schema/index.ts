import {appSchema} from '@nozbe/watermelondb';
import {TagsSchema} from './Tags.schema';
import {ProductTagsSchema} from './ProductTags.schema';
import {ProductsSchema} from './Products.schema';
import { BasketItemsSchema } from './BasketItems.schema';

export default appSchema({
  version: 1,
  tables: [TagsSchema, ProductsSchema, ProductTagsSchema,BasketItemsSchema],
});
