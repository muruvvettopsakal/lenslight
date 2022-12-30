import mongoose from 'mongoose';
import bcrypt from "bcrypt";

const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
    password:{
    type:String,
    required:true,
  },
  },
  {
    timestamps: true,
  },

 
  // user: {
    //type: Schema.Types.ObjectId,
   // ref: 'User',
  //},
  //url: {
   // type: String,
    //required: true,
 // },
  //image_id: {
   // type: String,
  //},
);
userSchema.pre("save",function(next) {

  const user = this;
  console.log('USER PASS 1', user.password);
  bcrypt.hash(user.password,10,(err,hash) =>{
    user.password =hash;
    console.log('USER PASS 2', user.password);
    next();
  });

});


const User = mongoose.model('User', userSchema);

export default User;