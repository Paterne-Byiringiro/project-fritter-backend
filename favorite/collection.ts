import type {HydratedDocument, Types} from 'mongoose';
import type {Favorite} from './model';
import FavoriteModel from './model';
import UserCollection from '../user/collection';


class FavoriteCollection {
    /**
     * Add a favorite to the collection
     *
     * @param {string} authorId - The id of the author of the favorite
     * @param {string} name - The name of the favorite
     * @param {string} url - The id of the url of the favorite
     * @return {Promise<HydratedDocument<Favorite>>} - The newly created favorite
     */
    static async addOne(authorId: Types.ObjectId | string, name: string, url: string): Promise<HydratedDocument<Favorite>> {
      const date = new Date();
      const favorite = new FavoriteModel({
        authorId,
        dateCreated: date,
        name,
        url,
        dateModified: date
      });
      await favorite.save(); // Saves favorite to MongoDB
      return favorite.populate('authorId');
    }

   /**
   * Find a favorite by favoriteId
   *
   * @param {string} favoriteId - The id of the favorite to find
   * @return {Promise<HydratedDocument<Favorite>> | Promise<null> } - The favorite with the given favoriteId, if any
   */
  static async findOne(favoriteId: Types.ObjectId | string): Promise<HydratedDocument<Favorite>> {
    return FavoriteModel.findOne({_id: favoriteId});
  }

/**
   * Get all the favorites in by given author
   *
   * @param {string} username - The username of author of the favorite
   * @return {Promise<HydratedDocument<Favorite>[]>} - An array of all of the favorites
   */
 static async findAllByUsername(username: string): Promise<Array<HydratedDocument<Favorite>>> {
    const author = await UserCollection.findOneByUsername(username);
    return FavoriteModel.find({authorId: author._id}).populate('authorId');
  }


  /**
   * Delete a favorite with given favoriteId.
   *
   * @param {string} favoriteId - The favoriteId of favorite to delete
   * @return {Promise<Boolean>} - true if the favorite has been deleted, false otherwise
   */
   static async deleteOne(favoriteId: Types.ObjectId | string): Promise<boolean> {
    const favorite = await FavoriteModel.deleteOne({_id: favoriteId});
    return favorite !== null;
  }


}
export default FavoriteCollection;
