import { useQuery } from '@apollo/client';
import GetUser from '../../lib/graphql/queries/User';
import { User as UserData, UserVariables } from '../../lib/graphql/queries/__generated__/User';
import React from 'react';
import { RouteComponentProps } from 'react-router';
import { Col, Layout, Row } from 'antd';
import UserProfile from './UserProfile';
import { Viewer } from '../../lib/types';
import PageSkeleton from '../../components/PageSkeleton';
import ErrorBanner from '../../components/ErrorBanner';

interface UserProps {
    viewer: Viewer;
}

interface MatchParamsProps {
    id: string;
}

const { Content } = Layout;

const User = ({ viewer, match }: UserProps & RouteComponentProps<MatchParamsProps>) => {
    const { data, loading, error } = useQuery<UserData, UserVariables>(GetUser, {
        variables: {
            id: match.params.id
        }
    });

    const user = data ? data.user : null;
    const viewerIsUser = viewer.id === match.params.id;

    const userProfileElement = user ? <UserProfile user={ user } viewerIsUser={ viewerIsUser }/> : null;

    if (loading) {
        return (
            <Content className='user'>
                <PageSkeleton />
            </Content>
        );
    };

    if (error) {
        return (
            <Content className='user'>
                <ErrorBanner description='This error may not exist or we have encoutered an error. Please try again later.'/>
                <PageSkeleton />
            </Content>
        );
    };

    return (
        <Content className='user'>
            <Row gutter={ 12 } justify='space-between' align='middle'>
                <Col xs={ 24 }>{ userProfileElement }</Col>
            </Row>
        </Content>
    );
};

export default User;
