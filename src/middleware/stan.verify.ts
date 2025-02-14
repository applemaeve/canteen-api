import Joi from 'joi'
import { NextFunction, Request, Response } from 'express'


export const addDataSchema = Joi.object({
    userId: Joi.string().optional(),
    nama_stan: Joi.string().required(),
    nama_pemilik: Joi.string().required(),
    telp: Joi.string().required(),
  });


export const addUpdateSchema = Joi.object({
  userId: Joi.string().optional(),
  nama_stan: Joi.string().optional(),
  nama_pemilik: Joi.string().optional(),
  telp: Joi.string().optional(),
  });

    export const verifyAddStan = (req: Request, res: Response, next: NextFunction) => {
      /** validate a req body and grab error if exist */
      const { error } = addDataSchema.validate(req.body, { abortEarly: false })
  
      if (error) {
          /** if there is an error, then give a res like this */
          res.status(400).json({
              status: false,
              message: error.details.map(it => it.message).join()
          })
      }
      return next()
  }

    export const verifyUpdateStan = (req: Request, res: Response, next: NextFunction) => {
      /** validate a req body and grab error if exist */
      const { error } = addUpdateSchema.validate(req.body, { abortEarly: false })
  
      if (error) {
          /** if there is an error, then give a res like this */
          res.status(400).json({
              status: false,
              message: error.details.map(it => it.message).join()
          })
      }
      return next()
  }

