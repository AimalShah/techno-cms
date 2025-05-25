"use server"

import { SignupFormSchema, FormState, LoginFormState, LoginFormSchema } from "@/lib/definitions"
import { createSession, deleteSession } from "@/lib/session";
import bycrypt  from "bcrypt";
import { error } from "console";
import { redirect } from "next/navigation";

export async function signup(state: FormState, formData: FormData) {
    const validateFields = SignupFormSchema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
        role : formData.get("role")
        
    });
    
    if(!validateFields.success){
        return {
            errors : validateFields.error.flatten().fieldErrors
        }
    }
    const {name , email, password , role} = validateFields.data;
    const hashedPassword = await bycrypt.hash(password , 10);

    const reqData = {
        username : name,
        email,
        password : hashedPassword,
        role
    }

    try {
        const res = await fetch("http://localhost:3000/api/signup" , {
            method : 'POST',
            body : JSON.stringify(reqData),
        });

        if(res.ok){
            const data = await res.json();
            await createSession(data.userData.id);
            return redirect("/");
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

export async function login(state: LoginFormState, formData: FormData){
    const validateField = LoginFormSchema.safeParse({
        email: formData.get("email"),
        password : formData.get("password"),
    });

    if(!validateField.success){
        return {
            errors : validateField.error.flatten().fieldErrors
        }
    }

    const {email , password} = validateField.data;
    const body =  {
        email,
        password
    };

    try{
        const res = await fetch('http://localhost:3000/api/login' , {
            method : 'POST',
            body : JSON.stringify(body)
        });

        if(res.ok){
            const data = await res.json();
            await createSession(data.user);
            redirect("/");
        }
        
        const err = await res.json();

        return {
            error : true,
            message : err.message
        };

    } catch(e){
        throw e;
    }


}

export async function logout(){
    deleteSession();
    redirect("/login");
}