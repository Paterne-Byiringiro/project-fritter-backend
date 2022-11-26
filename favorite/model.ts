import type {Types, PopulatedDoc, Document} from 'mongoose';
import {Schema, model} from 'mongoose';
import type {User} from '../user/model';

export type Favorite = {
    _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
    authorId: Types.ObjectId;
    dateCreated: Date;
    name: string;
    url: string;
    dateModified: Date;
  };

export type PopulatedFavorite = {
    _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
    authorId: User;
    dateCreated: Date;
    name: string;
    url: string;
    dateModified: Date;
  };

const FavoriteSchema = new Schema<Favorite>({
// The author userId
authorId: {
    // Use Types.ObjectId outside of the schema
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
},
// The date the favorite was created
dateCreated: {
    type: Date,
    required: true
},
name: {
    type: String,
    required: true
},
// The link of the favorite
url: {
    type: String,
    required: true
},
// The date a favorite was modified
dateModified: {
    type: Date,
    required: true
}
});

const FavoriteModel = model<Favorite>('Favorite', FavoriteSchema);

export default FavoriteModel;
