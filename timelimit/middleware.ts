import type {Request, Response, NextFunction} from 'express';
import {Types} from 'mongoose';
import TimelimitCollection from '../timelimit/collection';

/**
 * Checks if a timlimit with timelimitId is req.params exists
 */
const isTimelimitExists = async (req: Request, res: Response, next: NextFunction) => {
  const validFormat = Types.ObjectId.isValid(req.params.timelimitId);
  const timelimit = validFormat ? await TimelimitCollection.findOne(req.params.timelimitId) : '';
  if (!timelimit) {
    res.status(404).json({
      error: {
        timelimitNotFound: `Timelimit with timelimit ID ${req.params.timelimitId} does not exist.`
      }
    });
    return;
  }

  next();
};

/**
 * Always allows operations to continue or not
 */

export {
    isTimelimitExists

  };
  