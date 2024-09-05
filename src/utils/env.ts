import { cleanEnv, str } from 'envalid';

export const env = cleanEnv(process.env, {
    MONGO_URI: str(),
});
