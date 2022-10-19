import MongoDBStore from "connect-mongodb-session";
import expressSession from 'express-session'
import {MONGO_URI} from "./env.config";


export const sessionStore = (session: typeof expressSession) => {

    const mongoStore = MongoDBStore(session);

    return new mongoStore({
        collection: "userSessions",
        uri: MONGO_URI,
        expires: 1000 * 60 * 60 * 24,
    });
}