import { gql } from '@apollo/client';

const LogOut = gql`
	mutation LogOut {
		logOut {
			id
			token
			avatar
			hasWallet
			didRequest
		}
	}
`;

export default LogOut;
