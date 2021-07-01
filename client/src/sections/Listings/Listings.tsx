import { useMutation, useQuery, gql } from '@apollo/client';
import React from 'react';
import { Listings as ListingsData, Listings_listings as Listing } from './__generated__/Listings'; 
import { DeleteListing as DeleteListingData, DeleteListingVariables } from './__generated__/DeleteListing';
import { List, Avatar, Button, Spin } from 'antd';
import ListingsSkeleton from './ListingsSkeleton';

import './styles/Listings.css';

const LISTINGS = gql`
    query Listings {
        listings {
            id
            title
            image
            address
            price
            numOfGuests
            numOfBeds
            rating
        }
    }
`;

const DELETE_LISTING = gql`
    mutation DeleteListing($id: ID!) {
        deleteListing(id: $id) {
            id
        }
    }
`;

const Listings = () => {
    const { data, refetch, loading, error: getListingsError } = useQuery<ListingsData>(LISTINGS);
    const listings = data ? data.listings : null;

    const [deleteListing, { loading: deleteListingLoading, error: deleteListingError }] = useMutation<DeleteListingData, DeleteListingVariables>(DELETE_LISTING);

    const handleDeleteListing = async (id: string) => {
        await deleteListing({
            variables: { id }
        });
        refetch();
    };

    const action = (id: string) => (
        <Button
            onClick={ () => handleDeleteListing(id) }
            type='primary'
        >
            Delete
        </Button>
    );

    const listing = (listing: Listing) => (
        <List.Item actions={[ action(listing.id) ]}>
            <List.Item.Meta
                title={ listing.title }
                description={ listing.address }
                avatar={ <Avatar src={ listing.image } shape='square' size='large' /> }
            />
        </List.Item>
    );

    const listingsList = listings ? (
        <List
            itemLayout='horizontal'
            dataSource={ listings }
            renderItem={ listing }
        />
    ) : null;

    const loadingSkeleton = loading ? (
        <ListingsSkeleton />
    ) : null;

    const error = getListingsError || deleteListingError;

    const errorMessage = error ? (
        <h2>Something went wrong - please try again later!</h2>
    ) : null;

    return (
        <div className='listings'>
            <Spin spinning={ deleteListingLoading }>
                <h2>TinyHouse Listings</h2>
                { loadingSkeleton }
                { listingsList }
                { errorMessage }
            </Spin>
        </div>
    );
};

export default Listings;