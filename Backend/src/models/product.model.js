import mongoose from "mongoose";
// import priceSchema from "./price.model.js";
import priceSchema from "./price.model.js";
const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,

        
    },
    description:{
        type:String,
        required:true
    },
    seller:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,

    },

    price:{
        // amount:{
        //     type:String,
        //     required:true
        // },
        // currency:{
        //     type:String,
        //     enum:["USD","EUR","JPY","INR"],
        //     default:"INR",
        // }
        type: priceSchema,
        required: true


    },

    images:[
       {
        url:{
            type:String,
            required:true
        }
       }
    ],

    variants:[
        {
            images:[
                {
                    url:{
                        type:String,
                        required:true

                    }
                }

            ],
            stock:{
                type:Number,
                default:0
            },
            attributes:{
                type:Map,
                of:String
            },
            price:{
                type:priceSchema,
                // required:true
                // amount:{
                //     type:String,
                //     required:true
                // },

                // currency:{
                //     type:String,
                //     enum:["USD","EUR","GBP","INR"],
                //     default:"INR"
                // }
            }
        }
    ]
}
,{timestamps:true})

export const productModel = mongoose.model("product",productSchema)

export default productModel