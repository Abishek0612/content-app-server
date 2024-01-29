import mongoose from "mongoose";


const connectDB = async() => {
    try{
        const connected = await mongoose.connect(process.env.MONGO_URL)
        console.log("DB connected successfully")
    }catch(error){
        console.log(`Error : ${error.message}`)
        process.exit(1)
    }
}
export default connectDB