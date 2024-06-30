import { HttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  if (err instanceof HttpError) {
    res.status(err.status).json({
      status: err.status,
      message: err.message,
      errors: err.errors || [],
    });
    return;
  }
  res.status(500).json({
    message: 'Something went wrong',
    data: err.message,
  });
};
