import {
  MutationFunction,
  QueryFunction,
  UseInfiniteQueryOptions,
  UseMutationOptions,
  UseQueryOptions,
} from '@tanstack/react-query';
import {AxiosError, AxiosResponse} from 'axios';

// https://github.com/microsoft/TypeScript/issues/15300
export type SuccessResponse<TData = object> = AxiosResponse<TData>;

export type ErrorResponse<TError extends object = object> = AxiosError<TError>;

export type MutationOptions<
  TSuccess extends SuccessResponse,
  TError extends ErrorResponse,
  TProps = unknown,
> = UseMutationOptions<TSuccess, TError, TProps>;

export type QueryOptions<
  TSuccess extends AxiosResponse = SuccessResponse,
  TError extends ErrorResponse = ErrorResponse,
> = UseQueryOptions<TSuccess, TError>;

export type InfiniteQueryOptions<
  TSuccess extends SuccessResponse = SuccessResponse,
  TError extends ErrorResponse = ErrorResponse,
> = UseInfiniteQueryOptions<TSuccess, TError>;

export type MutationRequestFunction<
  TSuccess extends SuccessResponse,
  TProps = unknown,
  TCreatorProps = void,
> = (props: TCreatorProps) => MutationFunction<TSuccess, TProps>;

export type QueryRequestFunction<
  TSuccess extends AxiosResponse,
  TProps = void,
> = (props: TProps) => QueryFunction<TSuccess>;

export type Pageable<T = object> = {
  page: number;
  size: number;
  sort: string[] | string;
} & T;
