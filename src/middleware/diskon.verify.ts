import Joi from 'joi'
import { NextFunction, Request, Response } from 'express'


export const addDataSchema = Joi.object({
    nama_diskon: Joi.string().required(),
    persentase: Joi.number().required(),
    tanggal_awal: Joi.date().required(),
    tanggal_akhir:Joi.date().required(),
    stanId:Joi.string().required(),
  });

export const updateDataSchema = Joi.object({
    nama_diskon: Joi.string().optional(),
    persentase: Joi.number().optional(),
    tanggal_awal: Joi.date().optional(),
    tanggal_akhir:Joi.date().optional(),
    stanId:Joi.string().optional(),
  });

    export const verifyAddDiskon = (req: Request, res: Response, next: NextFunction) => {
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
    
      export const verifyUpdateDiskon = (req: Request, res: Response, next: NextFunction) => {
          /** validate a req body and grab error if exist */
          const { error } = updateDataSchema.validate(req.body, { abortEarly: false })
      
          if (error) {
              /** if there is an error, then give a res like this */
              res.status(400).json({
                  status: false,
                  message: error.details.map(it => it.message).join()
              })
          }
          return next()
      }
    
    