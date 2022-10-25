import type {HydratedDocument} from 'mongoose';
import moment from 'moment';
import type {Like, PopulatedLike} from '../Like/model';

// Update this if you add a property to the Like type!
type LikeResponse = {
  _id: string;
  author: string;
  freet: string;
  dislike: string;
  dateCreated: string;
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
 * Transform a raw Like object from the database into an object
 * with all the information needed by the frontend
 *
 * @param {HydratedDocument<Like>} like - A like
 * @returns {LikeResponse} - The like object formatted for the frontend
 */
const constructLikeResponse = (like: HydratedDocument<Like>): LikeResponse => {
  const likeCopy: PopulatedLike = {
    ...like.toObject({
      versionKey: false // Cosmetics; prevents returning of __v property
    })
  };
  const {username} = likeCopy.authorId;
  const dislike_ = likeCopy.dislike;
  const freet_ = likeCopy.freetId
  delete likeCopy.authorId;
  return {
    ...likeCopy,
    _id: likeCopy._id.toString(),
    author: username,
    freet : freet_.toString(),  // Need to change something if possible  !!!!
    dislike : dislike_.toString(),
    dateCreated: formatDate(like.dateCreated),
    dateModified: formatDate(like.dateModified)
  };
};

export {
  constructLikeResponse
};
