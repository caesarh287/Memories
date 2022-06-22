import mongoose  from "mongoose";

async function initDbConnection(){
    await mongoose.connect(
        process.env.MONGO_URI || 'mongodb+srv://caesarh287:1234@cluster0.fqapw.mongodb.net/?retryWrites=true&w=majority'
    );
}

export default initDbConnection;