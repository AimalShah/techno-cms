"use server"

import { SignupFormSchema, FormState } from "@/lib/definitions"
import bycrypt  from "bcrypt";

export async function signup(statr: FormState, formData: FormData) {
    const validateFields = SignupFormSchema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password")
    });
    
    if(!validateFields.success){
        return {
            errors : validateFields.error.flatten().fieldErrors
        }
    }
    const {name , email, password} = validateFields.data;
    const hashedPassword = await bycrypt.hash(password , 10);

    const reqData = {
        name,
        email,
        password : hashedPassword
    }

    try {
        const res = await fetch("http://localhost:3000/api/signup" , {
            method : 'POST',
            body : JSON.stringify(reqData),
        });

        if(res.ok){
            const data = await res.json();
            return { error : false , success : true , message : data.message};
        }

        return {
            error : true,
            success : false ,
            message : 'An error occurd try again'
        }
    } catch(e){
        throw  e;
    }

}