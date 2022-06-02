import Signup from '../model/user'
import { hashPassword, comparePassword } from '../utils/auth';

export const signup=async(req,res)=>{
    console.log(req.body)
    const {name, username, password, email}=req.body;
    
    if(!name) return res.status(400).send("Name is empty")
    if(!username) return res.status(400).send("Username is empty")
    if(!password) return res.status(400).send("Password is empty")
    if(!email) return res.status(400).send("Email is empty")
     
    let emailExist = await Signup.findOne({
        email

    }).exec()

    if(emailExist) return res.status(400).send("User already exist")
    
    const hashedPassword = await hashPassword(password)

    const userData=new Signup({
        name, 
        username, 
        password:hashedPassword, 
        email
    })
    await userData.save()
    return res.json({Message:"Sign in successful"})
}

export const login=async(req,res)=>{
    const {email, password}=req.body;
    //email xaina vane user not found vannu paro............
    const user = await Signup.findOne({
        email
    }).exec()
    console.log(user)
    const matched = await comparePassword(password,user.password)
    console.log(matched) //message aaaunu paro
}
