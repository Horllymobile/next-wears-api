const mongoose = require('mongoose');

module.exports = async function() {
    try {
        const con = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        });
        if(con) {
            console.log('Connected to mongodb');
        }
    } catch (error) {
        console.log(error.message);
    }
}