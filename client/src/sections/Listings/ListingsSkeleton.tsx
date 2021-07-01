import React from 'react';
import { Skeleton } from 'antd';

const ListingsSkeleton = () => (
    <Skeleton
        paragraph={{ rows: 3 }}
        active={ true }
    />
);

export default ListingsSkeleton;
