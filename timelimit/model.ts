import type {Types} from 'mongoose';
import {Schema, model} from 'mongoose';
import { User } from 'user/model';

/**
 * This file defines the properties stored in a Timelimit
 * DO NOT implement operations here ---> use collection file
 */

// Type definition for Like on the backend
export type Timelimit = {
    _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
    authorId: Types.ObjectId;
    startTime: Date;
    elapsedTime: number;
  };
  
  export type PopulatedTimelimit = {
    _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
    authorId: User;
    startTime: number;
    elapsedTime: number;
  };
  
// Mongoose schema definition for interfacing with a MongoDB table
// Timelimit objects stored in this table will have these fields, with the
// type given by the type property, inside MongoDB
const TimelimitSchema = new Schema({
  // The user's username
  authorId: {
    // Use Types.ObjectId outside of the schema
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },

  startTime: {
    type: Date,
    required: true
  },

  elaspsedTime: {
    type: Number,
    required: true
  }

});

const TimelimitModel = model<Timelimit>('Timelimit', TimelimitSchema);
export default TimelimitModel;
