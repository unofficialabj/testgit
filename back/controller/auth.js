import Signup from '../model/user'

export const signup=async(req,res)=>{
    console.log(req.body)
    const {name, username, password, email}=req.body;
    
    if(!name) return res.status(400).send("Name is empty")
    if(!username) return res.status(400).send("Username is empty")
    if(!password) return res.status(400).send("Password is empty")
    if(!email) return res.status(400).send("Email is empty")
     
    let userExist = await Signup.findOne({
        email

    }).exec()

    if(userExist) return res.status(400).send("User already exist")
    let emailExist = await Signup.findOne({
        email

    }).exec()
    if(emailExist) return res.status(400).send("User already exist")
    
    const userData=new Signup({
        name, 
        username, 
        password, 
        email
    })
    await userData.save()
    return res.json({Message:"Sign in successful"})
}