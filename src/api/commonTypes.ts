export interface MutationTime {
  createdBy: string;
  createdAt: string;
  modifiedBy?: string;
  modifiedAt?: string;
}

export type SuccessType = {
  success: boolean;
};

export type ErrorType = {
  code: number;
  description: string;
};
