import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email:{type:String, required: true, unique: true},
    username:{type:String, required: true, unique: true},
    password: {type: String, required: true},
    isActivated:{type:Boolean, default:false},
    activationLink:{type:String}
});

export default mongoose.model('User', userSchema);