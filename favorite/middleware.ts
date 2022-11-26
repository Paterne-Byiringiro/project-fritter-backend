import type {Request, Response, NextFunction} from 'express';
import {Types} from 'mongoose';
import FavoriteCollection from '../favorite/collection';

/**
 * Checks if a favorite with favoriteId is req.params exists
 */
 const isFavoriteExists = async (req: Request, res: Response, next: NextFunction) => {
    const validFormat = Types.ObjectId.isValid(req.params.favoriteId);
    const favorite = validFormat ? await FavoriteCollection.findOne(req.params.favoriteId) : '';
    if (!favorite) {
      res.status(404).json({
        error: {
          favoriteNotFound: `Favorite with favorite ID ${req.params.favoriteId} does not exist.`
        }
      });
      return;
    }
  
    next();
  };


export {
    isFavoriteExists,
  };
