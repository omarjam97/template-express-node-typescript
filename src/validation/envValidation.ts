import { cleanEnv, str, num } from 'envalid';

export const envValidation = () => {
    cleanEnv(process.env, {
        NODE_ENV: str({
            choices: ['development', 'test', 'production', 'staging'],
        }),
        PORT: num(),
        MONGO_USER: str(),
        MONGO_PASSWORD: str(),
        MONGO_PATH: str(),
    });
};
