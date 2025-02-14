import Joi from 'joi'
import { NextFunction, Request, Response } from 'express'

const validJenis = ['Makanan', 'Minuman'];

export const addDataSchema = Joi.object({
    nama_menu: Joi.string().required(),
    harga: Joi.number().required(),
    jenis: Joi.string().required(),
    deskripsi:Joi.string().required(),
    stok:Joi.number().required(),
    foto: Joi.allow().optional(),
  });

export const updateDataSchema = Joi.object({
    nama_menu: Joi.string().optional(),
    harga: Joi.number().optional(),
    jenis: Joi.string().valid(...validJenis).optional(),
    deskripsi:Joi.string().optional(),
    stok:Joi.number().optional(),
    foto: Joi.allow().optional(),
  });

export const verifyAddMenu = (req: Request, res: Response, next: NextFunction) => {
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

export const verifyUpdateMenu = (req: Request, res: Response, next: NextFunction) => {
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