import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
   name:{
    type:String,
    require:true,
    trim: true
   },
   username:{
    type:String,
    require:true,
    unique: true,
    trim: true
   },
   password:{
    type:String,
    require:true,
    trim: true
   }
},{
    timestamps:true
})

//module.exports =mongoose.model("user",userSchema)
const User = mongoose.model('User', userSchema);

export default User;
