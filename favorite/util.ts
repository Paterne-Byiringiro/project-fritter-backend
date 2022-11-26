import type {HydratedDocument} from 'mongoose';
import moment from 'moment';
import type {Favorite, PopulatedFavorite} from '../favorite/model';


type FavoriteResponse = {
  _id: string;
  author: string;
  dateCreated: string;
  name: string;
  url: string;
  dateModified: string;
};

/**
 * Encode a date as an unambiguous string
 *
 * @param {Date} date - A date object
 * @returns {string} - formatted date as string
 */
 const formatDate = (date: Date): string => moment(date).format('MMMM Do YYYY, h:mm:ss a');

 /**
  * Transform a raw Favorite object from the database into an object
  * with all the information needed by the frontend
  *
  * @param {HydratedDocument<Favorite>} favorite - A favorite
  * @returns {FavoriteResponse} - The favorite object formatted for the frontend
  */
 const constructFavoriteResponse = (favorite: HydratedDocument<Favorite>): FavoriteResponse => {
   const favoriteCopy: PopulatedFavorite = {
     ...favorite.toObject({
       versionKey: false // Cosmetics; prevents returning of __v property
     })
   };
   const {username} = favoriteCopy.authorId;
   delete favoriteCopy.authorId;
   return {
     ...favoriteCopy,
     _id: favoriteCopy._id.toString(),
     author: username,
     dateCreated: formatDate(favorite.dateCreated),
     dateModified: formatDate(favorite.dateModified)
   };
 };
 
 export {
   constructFavoriteResponse
 };
