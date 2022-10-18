import type {HydratedDocument, Types} from 'mongoose';
import type {Freet} from '../freet/model';
import {Comment} from './model';
import CommentModel from './model';
import UserCollection from '../user/collection';
import FreetCollection from '../freet/collection';

/**
 * This files contains a class that has the functionality to explore comments
 * stored in MongoDB, including adding, finding, updating, and deleting comments.
 * Feel free to add additional operations in this file.
 *
 * Note: HydratedDocument<Comment> is the output of the CommentModel() constructor,
 * and contains all the information in Comment. https://mongoosejs.com/docs/typescript.html
 */
class CommentCollection {
  /**
   * Add a comment to the collection
   *
   * @param {string} authorId - The id of the author of the comment
   * @param {Freet} freetId - The id of the freet
   * @param {string} content - The id of the content of the comment
   * @return {Promise<HydratedDocument<Comment>>} - The newly created comment
   */
  static async addOne(authorId: Types.ObjectId | string, freetId: Types.ObjectId | Freet, content: string): Promise<HydratedDocument<Comment>> {
    const date = new Date();
    const comment = new CommentModel({
      authorId,
      freetId,
      dateCreated: date,
      content,
      dateModified: date
    });
    await comment.save(); // Saves comment to MongoDB
    return comment.populate('authorId');
  }

  /**
   * Find a comment by commenttId
   *
   * @param {string} commentId - The id of the comment to find
   * @return {Promise<HydratedDocument<Comment>> | Promise<null> } - The comment with the given commentId, if any
   */
  static async findOne(commentId: Types.ObjectId | string): Promise<HydratedDocument<Comment>> {
    return CommentModel.findOne({_id: commentId}).populate('authorId');
  }

  /**
   * Get all the comments in the database
   *
   * @return {Promise<HydratedDocument<Comment>[]>} - An array of all of the comments
   */
  static async findAll(): Promise<Array<HydratedDocument<Comment>>> {
    // Retrieves comments and sorts them from most to least recent
    return CommentModel.find({}).sort({dateModified: -1}).populate(['authorId']);   // I added something      >>>>    .populate(["authorId","comments"])
  }

  /**
   * Get all the comments in by given author
   *
   * @param {string} username - The username of author of the comment
   * @return {Promise<HydratedDocument<Comment>[]>} - An array of all of the comments
   */
  static async findAllByAuthorId(authorId: string): Promise<Array<HydratedDocument<Comment>>> {
    return CommentModel.find({authorId: authorId}).populate('authorId');
  }

  
  /////
  /////
  ////   I ADDED THIS FUNCTION
  /////
  /////
  /**
   * Get all the comments on the freet
   * @param {Freet} freetId_ The freet
   * @return {Promise<HydratedDocument<Comment>[]>} - An array of all of the comments
   */
  static async findAllByFreet(freetId_: Types.ObjectId | string): Promise<Array<HydratedDocument<Comment>>> {
    const freet = await FreetCollection.findOne(freetId_);
    return CommentModel.find({freetId: freet._id}).populate('freetId');
  }

  /**
   * Update a comment with the new content
   *
   * @param {string} commentId - The id of the comment to be updated      // It's not needed to put freetId on which the comment is on.
   * @param {string} content - The new content of the comment
   * @return {Promise<HydratedDocument<Comment>>} - The newly updated comment
   */
  static async updateOne(commentId: Types.ObjectId | string, content: string): Promise<HydratedDocument<Comment>> {
    const comment = await CommentModel.findOne({_id: commentId});
    comment.content = content;
    comment.dateModified = new Date();
    await comment.save();
    return comment.populate('authorId');
  }

  /**
   * Delete a comment with given commentId.
   *
   * @param {string} commentId - The commentId of comment to delete
   * @return {Promise<Boolean>} - true if the comment has been deleted, false otherwise
   */
  static async deleteOne(commentId: Types.ObjectId | string): Promise<boolean> {
    const comment = await CommentModel.deleteOne({_id: commentId});
    return comment !== null;
  }

  /**
   * Delete all the comments by the given author
   *
   * @param {string} authorId - The id of author of comments
   */
  static async deleteMany(authorId: Types.ObjectId | string): Promise<void> {
    await CommentModel.deleteMany({authorId});
  }
}

export default CommentCollection;
