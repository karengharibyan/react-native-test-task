import * as zod from 'zod';

export const addOrEditProductSchema = zod.object({
  title: zod
    .string({
      required_error: 'Title is required',
    })
    .min(1, 'Title is required'),
  price: zod
    .string({required_error: 'Price is required'})
    .pipe(
      zod.number({coerce: true, invalid_type_error: 'Price must be a number'}),
    ),
  description: zod.string(),
});

export const OTPSchema = zod.object({
  phone: zod
    .string({
      required_error: 'Phone is required',
    })
    .min(1, 'Phone is required'),
  pin: zod
    .string({
      required_error: 'OTP is required',
    })
    .min(4, 'OPT is required'),
});
