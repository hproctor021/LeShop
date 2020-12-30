import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        })

        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
        // logs the connection host if successful
    } catch (error) {
        console.error(`Error: ${error.message}`.red.underline.bold)
        // shows the reason of error 
        process.exit(1)
        // to pass (1) means to exit with failure
    }
}

export default connectDB