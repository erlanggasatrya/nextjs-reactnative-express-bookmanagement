import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

export const MValidate = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const validationError: any = new Error("Validation error");
      validationError.status = 400;
      next(validationError);
    } else {
      next();
    }
  };
};