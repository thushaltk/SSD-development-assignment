const Manager = require("../models/manager")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const HttpError = require("../models/http-error");

const addNewManager = async (req, res, next) => {
    let encryptedPassword;
    try{
        encryptedPassword = await bcrypt.hash(req.body.password, 12);
    }catch(err){
        const error = new HttpError("Could not hash password, Try again.", 500);
        return next(error);
    }
    
    const createNewManager = new Manager({
        username:req.body.username,
        password: encryptedPassword
    });

    try{
        await createNewManager.save();
        res.status(201).json({ success: true, data: createNewManager });
    }catch(error){
        return next(new HttpError("Databse error occured", 500));
    }
}


const managerLogin = async (req, res, next) => {
    const {username, password} = req.body;
    if(!username || !password){
        return res.status(400).json({ success: false, message: "Username and password is empty"});
    }
    const foundManager = Manager.find(manager => manager.username == username);
    if(!foundManager){
        return res.status(401).json({success: false, message: "User not found"})
    }
    const matchPassword = await bcrypt.compare(password, foundManager.password);
    if(matchPassword){
        //creating jwt token
        const accessToken = jwt.sign(
            {"username": foundManager.username},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '300s'}
        );
        const refreshToken = jwt.sign(
            {"username": foundManager.username},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: '1d'}
        );
        const currentManager= {...foundManager, refreshToken};
        try{
            await currentManager.save();
        }catch(error){
            return next(new HttpError("Databse error occured", 500));
        }
        //sending refreshtoken and accesstoken to frontend
        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        res.json({accessToken});
    }else{
        res.status(401).json({message: "password mismatch"});
    }
}

const saveMsg = async (req, res, next) => {
    const {username, message} = req.body;
    if(!username || !message){
        return res.status(400).json({ success: false, message: "Username or message is empty"});
    }
    const foundManager = Manager.find(manager => manager.username == username);
    if(!foundManager){
        return res.status(401).json({success: false, message: "User not found"})
    }
    const updatedMessages = [...foundManager.savedMsgs, message];
    foundManager.savedMsgs = updatedMessages;
    try{
        await foundManager.save();
    }catch(error){
        return next(new HttpError("Databse error occured", 500));
    }

}

exports.addNewManager = addNewManager;
exports.managerLogin = managerLogin;
exports.saveMsg = saveMsg;