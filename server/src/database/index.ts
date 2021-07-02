import { MongoClient } from 'mongodb';
import { Database, User, Listing, Booking } from '../lib/types';

const user = process.env.MONGO_USER;
const password = process.env.MONGO_PASSWORD;
const cluster = process.env.MONGO_CLUSTER;

const url = `mongodb+srv://${ user }:${ password }@${ cluster }.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

export const connectDatabase = async (): Promise<Database> => {
    const client = await MongoClient.connect(url,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    );

    const db = client.db('tinyhouse');

    return {
        listings: db.collection<Listing>('listings'),
        users: db.collection<User>('users'),
        bookings: db.collection<Booking>('bookings')
    }
};
