import { gql } from '@apollo/client';

const AuthUrl = gql`
	query AuthUrl {
		authUrl
	}
`;

export default AuthUrl;
