import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export interface IResponseData {
   metadata?: any;
   message?: string;
   statusCode?: StatusCodes;
}

type ResponseType = (res: Response, data?: IResponseData) => void;

const OkResponse: ResponseType = (
   res,
   data = { statusCode: StatusCodes.OK, message: 'Successfully.' }
) => {
   const response = {
      statusCode: data.statusCode || StatusCodes.OK,
      message: data.message || 'Successfully.',
      metadata: data?.metadata
   };
   res.status(response.statusCode).json(response);
};

export default OkResponse;
