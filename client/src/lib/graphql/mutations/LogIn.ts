import { gql } from '@apollo/client';

const LogIn = gql`
	mutation LogIn($input: LogInInput) {
		logIn(input: $input) {
			id
			token
			avatar
			hasWallet
			didRequest
		}
	}
`;

export default LogIn;
