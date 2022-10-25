import type {Request, Response, NextFunction} from 'express';
import {Types} from 'mongoose';
import LikeCollection from '../like/collection';

/**
 * Checks if a likewith likeId is req.params exists
 */
const isLikeExists = async (req: Request, res: Response, next: NextFunction) => {
  const validFormat = Types.ObjectId.isValid(req.params.likeId);
  const like = validFormat ? await LikeCollection.findOne(req.params.likeId,false) : '';
  if (!like) {
    res.status(404).json({
      error: {
        commentNotFound: `Like with like ID ${req.params.likeId} does not exist.`
      }
    });
    return;
  }

  next();
};


/**
 * Checks if the current user is the author of the like whose likeId is in req.params
 */
const isValidLikeModifier = async (req: Request, res: Response, next: NextFunction) => {
  const like = await LikeCollection.findOne(req.params.likeId,false);
  const userId = like.authorId._id;
  if (req.session.userId !== userId.toString()) {
    res.status(403).json({
      error: 'Cannot modify other users\' likes.'
    });
    return;
  }

  next();
};

export {
  isLikeExists,
  isValidLikeModifier
};
