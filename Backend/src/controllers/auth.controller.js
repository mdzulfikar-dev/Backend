import mongoose from "mongoose";
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken"
// import { config } from "../config/config.js";
import { config } from "../config/config.js";
import bcrypt from "bcryptjs";

async function sendTokenResponse(user,res, message){
    const token = jwt.sign({
        id:user._id
    }, config.JWT_SECRET_KEY)
    

    res.cookie("token",token)
    res.status(200).json({
        message,
        token,
        user:{
            id:user._id,
            email:user.email,
            contact:user.contact,
            fullname:user.fullname,
            role:user.role
        }
    })
}


export const register = async (req,res)=>{
    const {email,contact,password,fullname,isSeller} = req.body

    try{
        const existingUser = await userModel.findOne({
            $or:[
                {email},
                {contact}
            ]
        })

        if(existingUser){
            return res.status(400).json({message:"User already exist with thhis email and password"})
        }


        const user = await userModel.create({
            email,
            contact,
            password,
            fullname,
            role:isSeller ? "seller": "buyer"
        })


        await sendTokenResponse(user, res, "User register successfully")

        

        




    
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            message:"Server error"
        })
    }
}


export const login = async (req,res)=>{
    const {email,password} = req.body;

    const user = await userModel.findOne({email})
    if(!user){
        return res.status(400).json({
            message:"Invalid email or password"
        })
    }

    const isMathch= await user.comparePasword(password)

    if(!isMathch){
        return res.status(404).json({
            message:"Invalid email or password"
        })
    }


    await sendTokenResponse(user,res,"UsrLogged in ")



}

export const googleCallback = async (req,res)=>{
    const {id,displayName,emails,photos} = req.user
  //  console.log(req.user)

  const email = emails[0].value;   // same user having multiple emails stored inside the array
  const profilePhotos = photos[0].value;   // same user have multiole photos stored in array



  // if user not regiterd on the website => google registerd import PropTypes from 'prop-types'
  //if it is registered => goggole logged in karega

  let user = await userModel.findOne({email})
  if(!user){
       user = await userModel.create({
             email,
             googleId:id,
             fullname:displayName

       })
    }

    const token = jwt.sign({
        id:user._id,
    },config.JWT_SECRET_KEY,{expiresIn:"7d"})
   

    res.cookie("token",token)

     res.redirect("http://localhost:5173/")

}
