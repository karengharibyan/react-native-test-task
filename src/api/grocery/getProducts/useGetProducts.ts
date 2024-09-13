import {useQuery} from '@tanstack/react-query';
import {
  GetProductsErrorResponse,
  GetProductsSuccessResponse,
  getProducts,
} from './getProducts';
import {QUERY_CACHE_KEYS} from '@api/cacheKeys';
import {database} from '@src/database';
import {Product, ProductTag, Tag} from '@src/database/models';
import {Q} from '@nozbe/watermelondb';

export const useGetProductsApi = () => {
  const {isLoading, data, refetch} = useQuery<
    GetProductsSuccessResponse,
    GetProductsErrorResponse
  >({
    queryKey: [QUERY_CACHE_KEYS.getProducts],
    queryFn: getProducts(),
  });

  const syncronizeProducts = () => {
    database.write(async () => {
      const productsCount = await database.get<Product>('products').query().fetchCount();
      if (data?.data && productsCount === 0) {
        for (const product of data?.data) {
          const tags = await database
            .get<Tag>('tags')
            .query(Q.where('name', Q.oneOf(product.tag)));
          const savedProduct = await database
            .get<Product>('products')
            .create(dbProduct => {
              dbProduct.title = product.title;
              dbProduct.description = product.description;
              dbProduct.discountPercentage = product.discountPercentage;
              dbProduct.stock = product.stock;
              dbProduct.rating = product.rating;
              dbProduct.price = product.price;
              dbProduct.sku = product.sku;
              dbProduct.availabilityStatus = product.availabilityStatus;
              dbProduct.images = product.images;
              dbProduct.thumbnail = product.thumbnail;
            });
          for (const tag of tags) {
            database.get<ProductTag>('product_tags').create(productTag => {
              // @ts-expect-error there is a type error in the watermelondb types
              productTag.product.set(savedProduct);
              // @ts-expect-error there is a type error in the watermelondb types
              productTag.tag.set(tag);
            });
          }
        }
      }

      //   const tags = await database
      //     .get<Tag>('tags')
      //     .query(Q.where('name', Q.oneOf(product.tag)));
      //   const savedProduct = await database
      //     .get<Product>('products')
      //     .create(dbProduct => {
      //       dbProduct.title = product.title;
      //       dbProduct.description = product.description;
      //       dbProduct.discountPercentage = product.discountPercentage;
      //       dbProduct.stock = product.stock;
      //       dbProduct.rating = product.rating;
      //       dbProduct.price = product.price;
      //       dbProduct.sku = product.sku;
      //       dbProduct.availabilityStatus = product.availabilityStatus;
      //       dbProduct.images = product.images;
      //       dbProduct.thumbnail = product.thumbnail;
      //     });
      //   console.log(savedProduct);
      //   // tags.forEach(tag => {
      //   //   database.get<ProductTag>('product_tags').create(productTag => {
      //   //     productTag.product.set(savedProduct);
      //   //     productTag.tag.set(tag);
      //   //   });
      //   // });
      // });
    });
  };

  return {
    getProducts: refetch,
    syncronizeProducts,
    isLoading,
    products: data?.data,
  };
};
