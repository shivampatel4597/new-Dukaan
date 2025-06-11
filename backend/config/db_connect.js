
import mongoose from 'mongoose'

const connect_db = async()=>{
    try{
   const conn = await mongoose.connect(process.env.MONGO_URL)
     console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
    catch(err){
        console.error(`Error: ${err.message}`);
    process.exit(1); // Exit process with failure
    }
}

export default connect_db