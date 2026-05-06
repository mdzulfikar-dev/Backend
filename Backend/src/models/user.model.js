import mongoose from "mongoose";

import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
    email:{type:String,require:true,unique:true },

    contact:{ type:String, required:false},
    password:{
        type:String,
        required: function(){
            return !this.googleId;   // here if googleid not present we need password for registration, if the user register with google it does  not the password  for registration
        }
    },
    fullname:{type:String,required:true},
    role:{
        type:String,
        enum:["buyer","seller"],
        default:"buyer"
    },

    googleId:{
        type:String
    }



})


// Db mai kuch bhi create karne se pahle async function execute hota hai

userSchema.pre("save", async function(){

    //if password is not modified return
    if(!this.isModified("password")) return

    // if not

    const hash = await bcrypt.hash(this.password,10);
    this.password = hash
})


userSchema.methods.comparePasword = async function(password){
    return await bcrypt.compare(password, this.password)
}

const userModel = mongoose.model("user",userSchema)

export default userModel