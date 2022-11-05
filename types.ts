export type ErrorResponse = {
  type: string;
  message: string;
};

export type Status = {
  error?: string;
  success?: string;
  loading?: {
    actionType?: string;
  };
};
