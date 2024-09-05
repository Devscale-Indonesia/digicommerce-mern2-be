import mongoose from 'mongoose';
import { env } from './env';

export async function connectDB() {
    return mongoose
        .connect(env.MONGO_URI)
        .then(() => console.log('Connected to MongoDB'))
        .catch((err) => console.log(err));
}
