import * as mongoose from 'mongoose';
export const UserSchema = new mongoose.Schema({

    _id :{
        type: mongoose.Schema.Types.ObjectId,
     },
  email: {
    type: String,
    unique: true,
    required: true,
  },
   name: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  addressBook:{
    type: [],
    required: true,
  }
  
});




