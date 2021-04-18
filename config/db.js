const mongoose = require('mongoose');

const initConnection = async () => {
    try {
        await mongoose.connect(process.env.DEV_MONGO_URL, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true });
        console.log('database connected');
    } catch (error) {
        console.log(error);
    }
}

module.exports = initConnection;
