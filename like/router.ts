import type {NextFunction, Request, Response} from 'express';
import express from 'express';
import LikeCollection from './collection';
import * as userValidator from '../user/middleware';
import * as freetValidator from '../freet/middleware';
import * as util from './util';

const router = express.Router();

/**
 * Get all the likes
 *
 * @name GET /api/freets/likes
 *
 * @return {LikeResponse[]} - A list of all the likes sorted in descending
 *                      order by date modified
 */
/**
 * Get likes by author.
 *
 * @name GET /api/likes?authorId=id
 *
 * @return {FreetResponse[]} - An array of freets created by user with id, authorId
 * @throws {400} - If authorId is not given
 * @throws {404} - If no user has given authorId
 *
 */
 router.get(
  '/likes',
  async (req: Request, res: Response, next: NextFunction) => {
    // Check if authorId query parameter was supplied
    if (req.query.authorId !== undefined)  {
      
      
        const allLikes = await LikeCollection.findAllByAuthorId(req.query.authorId as string, false);  // I may need to change something
        const response = allLikes.map(util.constructLikeResponse);
        res.status(200).json(response);
 
    } else if (req.query.freetId !== undefined) {
     
        const likes = await LikeCollection.findAllByFreet(req.query.freetId as string, false);
        res.status(200).json(likes);
    

    } else {
     
        const allLikes = await LikeCollection.findAll(false);
        const response = allLikes.map(util.constructLikeResponse);
        res.status(200).json(response);
        }

    }

);

router.get(
  '/dislikes',
  async (req: Request, res: Response, next: NextFunction) => {
    // Check if authorId query parameter was supplied
    if (req.query.authorId !== undefined)  {
      
      
        const allLikes = await LikeCollection.findAllByAuthorId(req.query.authorId as string, true);  // I may need to change something
        const response = allLikes.map(util.constructLikeResponse);
        res.status(200).json(response);
 
    } else if (req.query.freetId !== undefined) {
     
        const likes = await LikeCollection.findAllByFreet(req.query.freetId as string, true);
        res.status(200).json(likes);
    

    } else {
     
        const allLikes = await LikeCollection.findAll(true);
        const response = allLikes.map(util.constructLikeResponse);
        res.status(200).json(response);
        }

    }

);




//////
////




/////////////
///////////



/**
 * Create a new like.
 *
 * @name POST /api/like
 * 
 * @return {LikeResponse} - The created like
 * @throws {403} - If the user is not logged in
 * 
 */
router.post(
  '/:freetId?/like',
  [
    userValidator.isUserLoggedIn,
    freetValidator.isFreetExists
  ],
  async (req: Request, res: Response) => {
    const userId = (req.session.userId as string) ?? ''; // Will not be an empty string since its validated in isUserLoggedIn
    const like = await LikeCollection.addOne(userId, req.body.freetId, false);

    res.status(201).json({
      message: 'Your like was created successfully.',
      like: util.constructLikeResponse(like)
    });
  }
);

router.post(
  '/:freetId?/dislike',
  [
    userValidator.isUserLoggedIn,
    freetValidator.isFreetExists
  ],
  async (req: Request, res: Response) => {
    const userId = (req.session.userId as string) ?? ''; // Will not be an empty string since its validated in isUserLoggedIn
    const dislike = await LikeCollection.addOne(userId, req.body.freetId, true);

    res.status(201).json({
      message: 'Your dislike was created successfully.',
      like: util.constructLikeResponse(dislike)
    });
  }
);


////
////

////

/**
 * Delete a like
 *
 * @name DELETE /api/likes/:id
 *
 * @return {string} - A success message
 * @throws {403} - If the user is not logged in or is not the author of
 *                 the like
 * @throws {404} - If the likeId is not valid
 */
router.delete(
  '/likes/:likeId?',
  [
    userValidator.isUserLoggedIn,
  ],
  async (req: Request, res: Response) => {
    await LikeCollection.deleteOne(req.params.likeId, false);
    res.status(200).json({
      message: 'Your like was deleted successfully.'
    });
  }
);

router.delete(
  '/dislikes/:likeId?',
  [
    userValidator.isUserLoggedIn,
  ],
  async (req: Request, res: Response) => {
    await LikeCollection.deleteOne(req.params.likeId, true);
    res.status(200).json({
      message: 'Your dislike was deleted successfully.'
    });
  }
);




export {router as likeRouter};
