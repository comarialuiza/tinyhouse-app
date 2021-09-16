import { gql } from '@apollo/client';

const User = gql`
    query User($id: ID!) {
        user(id: $id) {
            id
            name
            avatar
            contact
            hasWallet
            income
        }
    }
`;

export default User;
