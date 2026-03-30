import type { NextFunction, Request, Response } from "express";
import type { ZodTypeAny } from "zod";

import ApiError from "../utils/api-error.js";

const validateBody = (schema: ZodTypeAny) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      throw new ApiError(400, "Validation failed.", result.error.flatten());
    }

    req.body = result.data;
    next();
  };
};

const validateParams = (schema: ZodTypeAny) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.params);

    if (!result.success) {
      throw new ApiError(400, "Validation failed.", result.error.flatten());
    }

    req.params = result.data;
    next();
  };
};

export { validateBody, validateParams };
