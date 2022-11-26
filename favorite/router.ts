import type {NextFunction, Request, Response} from 'express';
import express from 'express';
import FavoriteCollection from './collection';
import * as userValidator from '../user/middleware';
import * as util from './util';

const router = express.Router();

/**
 * Get favorites by author.
 *
 * @name GET /api/favorites?authorId=id
 *
 * @return {FavoriteResponse[]} - An array of favorites created by user with id, authorId
 * @throws {400} - If authorId is not given
 * @throws {404} - If no user has given authorId
 *
 */
 //will change  --> /api/favorites?authorId=id
 router.get(
    '/',
    
    [
      userValidator.isAuthorExists
    ],
    async (req: Request, res: Response) => {
      const authorFavorites = await FavoriteCollection.findAllByUsername(req.query.author as string);
      const response = authorFavorites.map(util.constructFavoriteResponse);
      res.status(200).json(response);
    }
  );

  /**
 * Create a new favorite.
 *
 * @name POST /api/favorites
 *
 * @param {string} name - The name of the favorite
 * @param {string} url - The url of the favorite
 * @return {FavoriteResponse} - The created favorite
 * @throws {403} - If the user is not logged in
 * @throws {400} - If the favorite content is empty or a stream of empty spaces
 * @throws {413} - If the favorite content is more than 140 characters long
 */
router.post(
    '/',
    [
      userValidator.isUserLoggedIn,
    ],
    async (req: Request, res: Response) => {
      const userId = (req.session.userId as string) ?? ''; // Will not be an empty string since its validated in isUserLoggedIn
      const favorite = await FavoriteCollection.addOne(userId, req.body.name, req.body.url);
  
      res.status(201).json({
        message: 'Your favorite was created successfully.',
        favorite: util.constructFavoriteResponse(favorite)
      });
    }
  );

/**
 * Delete a favorite
 *
 * @name DELETE /api/favorite/:id
 *
 * @return {string} - A success message
 * @throws {403} - If the user is not logged in or is not the author of
 *                 the favorite
 * @throws {404} - If the favoriteId is not valid
 */
 router.delete(
    '/:favoriteId?',
    [
      userValidator.isUserLoggedIn,
    ],
    async (req: Request, res: Response) => {
      await FavoriteCollection.deleteOne(req.params.favoriteId);
      res.status(200).json({
        message: 'Your favorite was deleted successfully.'
      });
    }
  );
  
  export {router as favoriteRouter};