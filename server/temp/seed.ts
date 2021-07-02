require('dotenv').config();

import { connectDatabase } from '../src/database';
import { listings, users } from '../src/database/mockData';

const seed = async () => {
	try {
		console.log('[seed]: running');

		const db = await connectDatabase();

		for (const listing of listings) {
			await db.listings.insertOne(listing);
		}

		for (const user of users) {
			await db.users.insertOne(user);
		}

		console.log('[seed]: has been successful');
	} catch (err) {
		throw new Error(err);
	}
};

seed();
