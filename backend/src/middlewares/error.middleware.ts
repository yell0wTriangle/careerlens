import type { NextFunction, Request, Response } from "express";

import ApiError from "../utils/api-error.js";

const errorHandler = (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      details: err.details ?? null,
    });
    return;
  }

  const message = err instanceof Error ? err.message : "Internal Server Error";

  res.status(500).json({
    success: false,
    message,
    details: null,
  });
};

export { errorHandler };
