import {body,validationResult} from "express-validator"



const validate = (req,res,next)=>{
    const errors = validationResult(req)
    
                if(!errors.isEmpty()){
                    return res.status(400).json({
                        errors:errors.array()
    
                    })
                }else{
                    return next()
                }


}



export const validateRegisterUser = [
    body("email")
    .isEmail().withMessage("Invalid email format"),

    body("contact")
    .notEmpty().withMessage("Contact is required")
    .matches(/^\d{10}$/).withMessage("Contact must be a 10-digit number"),

    body("password")
    .isLength({min:6}).withMessage("Password must be at least 6 characters long"),

    body("fullname")
    .notEmpty().withMessage("name is required")
    .isLength({min:3}).withMessage("full name must be at least 3 characters long "),

    body("isSeller")
    .isBoolean().withMessage("isSeller must be a boolean value"),

    validate

]

export const validateLoginUser = [
    body("email")
    .isEmail().withMessage("Invalid email format"),

    body("password")
    .notEmpty().withMessage("Password is required"),
    validate
]