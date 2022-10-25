import type {HydratedDocument, Types} from 'mongoose';
import type {Freet} from '../freet/model';
import {Like} from './model';
import LikeModel from './model';
import UserCollection from '../user/collection';
import FreetCollection from '../freet/collection';
import type {User} from '../user/model';
import UserModel from '../user/model';
import { constructUserResponse } from 'user/util';

/**
 * This files contains a class that has the functionality to explore likes
 * stored in MongoDB, including adding finding, and deleting a like.
 * Feel free to add additional operations in this file.
 *
 * Note: HydratedDocument<Like> is the output of the LikeModel() constructor,
 * and contains all the information in Like. https://mongoosejs.com/docs/typescript.html
 */
class LikeCollection {
  /**
   * Add a like to the collection
   *
   * @param {string} authorId - The id of the author of the like
   * @param {Freet} freetId - The id of the freet
   * @param {boolean} dislike_ - if true it's a dislike else a like
   * @return {Promise<HydratedDocument<Like>>} - The newly created like
   */
  static async addOne(authorId: Types.ObjectId | string, freetId: Types.ObjectId | Freet, dislike_: boolean): Promise<HydratedDocument<Like>> {
    
    const date = new Date();
    const like = new LikeModel({
      authorId,
      freetId,
      dislike: dislike_,
      dateCreated: date,
      dateModified: date
    });
    await like.save(); // Saves like to MongoDB
    return like.populate('authorId');
  
  }
  

  /**
   * Find a like by likeId
   *
   * @param {string} likeId - The id of the like to find
   * @param {boolean} dislike_ - true if dislike or false if it is a like
   * @return {Promise<HydratedDocument<Like>> | Promise<null> } - The like with the given likeId, if any
   */
  static async findOne(likeId: Types.ObjectId | string, dislike_: boolean): Promise<HydratedDocument<Like>> {
    return LikeModel.findOne({_id: likeId, dislike: dislike_}).populate('authorId');
  }



  /**
   * Get all the likes on the freet
   * @param {Freet} freetId_ The freet
   * @param {boolean} dislike_ - 
   * @return {Promise<HydratedDocument<Like>[]>} - An array of all of the likes
   */
   static async findAllByFreet(freetId_: Types.ObjectId | string, dislike_: boolean): Promise<Array<HydratedDocument<Like>>> {
    const freet = await FreetCollection.findOne(freetId_);
    return LikeModel.find({freetId: freet._id, dislike: dislike_}).populate('freetId');
  }
 
/////////////////
///////////////////
//////////////////
//////////////////////////
/**
   * Get all the likes on a freet by  given author 
   *
   * @param {string} authorId - The authorId of the like
   * @param {Freet} freetId_ - The freet where the like is
   * @param {boolean} dislike_ - 
   * 
   * @return {Promise<HydratedDocument<Like>[]>} - An array of all of the likes
   */
 static async findLikeByAuthorAndFreetId(authorId: Types.ObjectId | string, freetId_ : Freet, dislike_: boolean): Promise<Array<HydratedDocument<Like>>> {
  return LikeModel.find({authorId: authorId,freetId: freetId_, dislike: dislike_}).populate('authorId');
}


 //Number of likes
/**
   * Get all the likes on the freet
   *@param {boolean} dislike_
   * @return {Promise<number>} - number of likes on the freet
   */
 static async numberlikesOnFreet(freetId_: Types.ObjectId | string, dislike_: boolean) : Promise<number>  {
  const likes =  await LikeCollection.findAllByFreet(freetId_,dislike_);
  return likes.length
 }

/*
 //users who likes the freet

 static async usernamesLikedFreet(freetId_: Types.ObjectId | string) : Promise<HydratedDocument<User>>  {
  const freet = await FreetCollection.findOne(freetId_);
  return LikeModel.find({freetId: freet._id}, {authorId:1});
  
 }

*/

//////////////////////////////////////////////
/////////////////////////////////////////////
////////////////////////////////////////////
/////////////////////////////////////////////

  /**
   * Get all the likes in the database
   *@param {boolean} dislike_
   * @return {Promise<HydratedDocument<Like>[]>} - An array of all of the likes
   */
  static async findAll(dislike_: boolean): Promise<Array<HydratedDocument<Like>>> {
    // Retrieves likes and sorts them from most to least recent
    return LikeModel.find({dislike: dislike_}).sort({dateModified: -1}).populate(['authorId']);   // I added something      >>>>    .populate(["authorId","likes"])
  }

  /**
   * Get all the likes in by given author
   *
   * @param {string} authorId - The authorId of the like
   * @param {boolean} dislike_ 
   * @return {Promise<HydratedDocument<Like>[]>} - An array of all of the likes
   */
  static async findAllByAuthorId(authorId: Types.ObjectId | string, dislike_: boolean): Promise<Array<HydratedDocument<Like>>> {
    return LikeModel.find({authorId: authorId,dislike: dislike_}).populate('authorId');
  }

   /**
   * Get all the likes in by given author (username)
   *
   * @param {string} username - The username of author of the likes
   * @param {boolean} dislike_
   * @return {Promise<HydratedDocument<Like>[]>} - An array of all of the likes
   */
    static async findAllByUsername(username: string, dislike_: boolean): Promise<Array<HydratedDocument<Like>>> {
        const author = await UserCollection.findOneByUsername(username);
        return LikeModel.find({authorId: author._id,dislike: dislike_}).populate('authorId');
      }


  /**
   * Delete a like with given likeId.
   *
   * @param {string} likeId - The likeId of like to delete
   * @param {boolean} dislike_
   * @return {Promise<Boolean>} - true if the like has been deleted, false otherwise
   */
  static async deleteOne(likeId: Types.ObjectId | string, dislike_:boolean): Promise<boolean> {
    const like = await LikeModel.deleteOne({_id: likeId,dislike: dislike_});
    return like !== null;
  }

  /**
   * Delete all the likes by the given author
   *
   * @param {string} authorId - The id of author of likes
   */
  static async deleteMany(authorId: Types.ObjectId | string, dislike_:boolean): Promise<void> {
    await LikeModel.deleteMany({authorId: authorId, dislike: dislike_});
  }

}





export default LikeCollection;
