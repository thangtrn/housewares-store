import { Request, Response, NextFunction } from "express";
import {
  ErrorException,
  NotFoundException,
  reasonPhrases,
  statusCode,
} from "~/utils/response";

export class handleError {
  public static NotFound = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    next(
      new NotFoundException(`[${req.method}] Not found resource: ${req.url}`)
    );
  };

  public static InternalServer = (
    err: ErrorException,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {

    console.log('--- ERROR EXCEPTION---');
    console.table([
      {
        "Status code": err.statusCode,
        "Time": new Date()
      }
    ])

    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json({
      statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
      message: err.message || reasonPhrases.INTERNAL_SERVER_ERROR,
    });
  };
}
