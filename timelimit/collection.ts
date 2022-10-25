import type {HydratedDocument, Types} from 'mongoose';
import type {Timelimit} from './model';
import TimelimitModel from './model';
import UserCollection from '../user/collection';

/**
 * This file contains a class with functionality to interact with Timelit stored
 * in MongoDB, including difference between to times, resetting time
 *
 * Note: HydratedDocument<User> is the output of the TimelimitModel() constructor,
 * and contains all the information in User. https://mongoosejs.com/docs/typescript.html
 */
 class TimelimitCollection {


    /**
     * Add a timelimit
     * 
     * @param {string} username- The id of the author of the like
     * @param {Date} startTime - the date the time limit is started
     * @param {number} elapsedTime
     * 
     * @return {Promise<HydratedDocument<Timelimit>>} The newly created timelimit
     */
     static async addOne(username: string, startTime: Types.ObjectId | Date, elapsedTime: number): Promise<HydratedDocument<Timelimit>> {

        const authorId = await UserCollection.findOneByUsername(username);  
    
        const newdate = new Date();

        
        const timelimit = new TimelimitModel({
          authorId,
          startTime, // Date
          elapsedTime //in ms
        });
        await timelimit.save(); // Saves like to MongoDB
        return timelimit.populate('authorId');
      
      }

    /**
     * 
     * @param username the name of the user on timelimit
     * @returns Promise<HydratedDocument<Comment>> - the timelimit represented by the authorId
     */
    static async findOne(username: string): Promise<HydratedDocument<Timelimit>> {
    const author = await UserCollection.findOneByUsername(username);
    return TimelimitModel.findOne({authorId: author}).populate('authorId');
    }

    /**
     * 
     * @param username the author of the timelimit
     * @returns true if deleted else false
     */  
    static async deleteOne(username: string): Promise<boolean> {
        const author = await UserCollection.findOneByUsername(username);   
        const limit = await TimelimitModel.deleteOne({authorId:author});
         return limit !== null;
    }


    
  }
  
  export default TimelimitCollection;