import bcrypt from 'bcrypt'; //importing bcrypt

//password hashing

export const hashPassword = (password) =>{
    return new Promise((resolve, reject) =>{
        bcrypt.genSalt(12,(err,salt)=>{
            if(err){
                console.log('salting error');
                reject(err);
            }
            bcrypt.hash(password, salt, (err,hash)=>{
                if(err){
                    console.log('password hashing error');
                    reject(err);
                }
                resolve(hash);
            })
        })
    })
}
//it compares and returns true or false
export const comparePassword=(password, hashedPassword)=>{
    return bcrypt.compare(password,hashedPassword);
}