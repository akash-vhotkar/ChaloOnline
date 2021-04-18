const mongoose = require('mongoose');

const initConnection = async () => {
    try {
        await mongoose.connect("mongodb+srv://akash:akash1234@cluster0.4ayge.mongodb.net/data3?retryWrites=true&w=majority", { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true });
        console.log('database connected');
    } catch (error) {
        console.log(error);
    }
}

module.exports = initConnection;
