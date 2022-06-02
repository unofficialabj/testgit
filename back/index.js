const express = require('express');  
const cors = require('cors');
const csurf = require('csurf');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config({path:'./.env'});
const { readdirSync } = require("fs");
const { request } = require('http');
const csrfProtection = csurf({ cookie: true });


const app = express();

const port = 5000;


mongoose.connect(process.env.DATABASE)
.then(()=>{
    console.log('Database Connected')
})
    .catch((err)=>console.log(err))

app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json({limit:'5mb'}));

app.use((req,res,next)=>{
    console.log('I am middleware');
    next();
})


readdirSync('./routes').map((r)=>{
    return app.use('/api',require(`./routes/${r}`));
})

app.use(csrfProtection);
app.get('/api/csrf-token',(req,res)=>{
res.json({csrfToken: req.csrfToken()})
})

app.listen(port, () => {
    console.log('Our app is running on port', port)
})