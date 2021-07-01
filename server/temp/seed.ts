require('dotenv').config();

import { connectDatabase } from '../src/database';
import { listings } from '../src/listings';

const seed = async () => {
    try {
        console.log('[seed]: running');

        const db = await connectDatabase();

        for (const listing of listings) {
            await db.listings.insertOne(listing);
        }

        console.log('[seed]: has been successful')
    } catch(err) {
        throw new Error(err);
    }
}

seed();