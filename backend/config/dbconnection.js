const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        await mongoose.connect("mongodb+srv://thushaltk:thushal1234@cluster0.tivsh.mongodb.net/ssd?retryWrites=true&w=majority").then(() => {
            console.log("DB conenction success");
        })
    }catch(error){
        console.error(error);
    }
}

module.exports = connectDB;