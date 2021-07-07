import { IResolvers } from 'apollo-server-express';
import { Viewer, Database, User } from '../../../lib/types';
import { Google } from '../../../lib/api/Google';
import { LogInArgs } from './types';
import crypto from 'crypto';

const logInViaGoogle = async (
	code: string,
	token: string,
	db: Database
): Promise<User | undefined> => {
	const { user } = await Google.logIn(code);

	if (!user) {
		throw new Error('Google log in error');
	}

	const userName = user?.names?.[0]?.displayName;
	const userId = user?.names?.[0]?.metadata?.source?.id;
	const userAvatar = user?.photos?.[0]?.url;
	const userEmail = user?.emailAddresses?.[0]?.value;

	if (!userId || !userName || !userAvatar || !userEmail) {
		throw new Error('Google log in error');
	}

	const updateRes = await db.users.findOneAndUpdate(
		{ _id: userId },
		{
			$set: {
				name: userName,
				avatar: userAvatar,
				contact: userEmail,
				token,
			},
		},
		{ returnOriginal: false }
	);

	let viewer = updateRes.value;

	if (!viewer) {
		const insertResult = await db.users.insertOne({
			_id: userId,
			token,
			name: userName,
			avatar: userAvatar,
			contact: userEmail,
			income: 0,
			bookings: [],
			listings: [],
		});

		viewer = insertResult.ops[0];
	}

	return viewer;
};

export const viewerResolvers: IResolvers = {
	Query: {
		authUrl: (): string => {
			try {
				return Google.authUrl;
			} catch (err) {
				throw new Error(`Failed to query Google Auth Url: ${err}`);
			}
		},
	},
	Mutation: {
		logIn: async (
			_root: undefined,
			{ input }: LogInArgs,
			{ db }: { db: Database }
		): Promise<Viewer> => {
			try {
				const code = input ? input.code : null;
				const token = crypto.randomBytes(16).toString('hex');

				const viewer = code ? await logInViaGoogle(code, token, db) : undefined;

				if (!viewer) {
					return { didRequest: true };
				}

				return {
					_id: viewer._id,
					token: viewer.token,
					avatar: viewer.avatar,
					walletId: viewer.walletId,
					didRequest: true,
				};
			} catch (err) {
				throw new Error(`Failed to log in: ${err}`);
			}
		},
		logOut: (): Viewer => {
			try {
				return { didRequest: true };
			} catch (err) {
				throw new Error(`Failed to log out: ${err}`);
			}
		},
	},
	Viewer: {
		id: (viewer: Viewer) => viewer._id,
		hasWallet: (viewer: Viewer): boolean | undefined =>
			viewer.walletId ? true : undefined,
	},
};
