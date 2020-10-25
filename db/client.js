const mongoose = require('mongoose');
const connectionString = "mongodb+srv://zeenat:zeenat1234@cluster0.vlohf.mongodb.net/test?retryWrites=true&w=majority";


const InitiateMongoServer = async () => {
    try {
        await mongoose.connect(connectionString, {
            useNewUrlParser: true
        });
        console.log("Connected to DB !!");
    } catch (e) {
        console.log(e.stackTrace);
        throw e;
    }
};

module.exports = InitiateMongoServer;