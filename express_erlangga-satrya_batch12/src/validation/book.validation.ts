import Joi from 'joi';
import { ICreateBook } from '../interface/book.interface';

export const createBookSchema = Joi.object<ICreateBook>({
    title: Joi.string().required().min(1).max(255),
    author: Joi.string().required().min(1).max(100),
    year: Joi.string().required().min(4).max(4), 
    description: Joi.string().max(500).allow(null, ''), 
    publisher: Joi.string().max(100).allow(null, ''), 
    cover_img: Joi.string().uri().max(1000).allow(null, ''), 
});

export const updateBookSchema = Joi.object<Partial<ICreateBook>>({ 
  title: Joi.string().min(1).max(255), 
  author: Joi.string().min(1).max(100),
  year: Joi.string().min(4).max(4),
  description: Joi.string().max(500).allow(null, ''),
  publisher: Joi.string().max(100).allow(null, ''),
  cover_img: Joi.string().uri().max(1000).allow(null, ''),
}).or('title', 'author', 'year', 'description', 'publisher', 'cover_img');