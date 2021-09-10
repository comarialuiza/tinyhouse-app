import { HomeOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/client';
import { Avatar, Button, Menu as MenuContainer } from 'antd';
import React, { Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import LogOut from '../lib/graphql/mutations/LogOut';
import { LogOut as LogOutData } from '../lib/graphql/mutations/__generated__/LogOut';
import { Viewer } from '../lib/types';
import { displaySuccessNotification, displayErrorMessage } from '../utils/NotificationUtils';

const { Item, SubMenu } = MenuContainer;

interface MenuProps {
    viewer: Viewer;
    setViewer: Dispatch<SetStateAction<Viewer>>;
}

const Menu = ({ viewer, setViewer }: MenuProps) => {
    const [logOut] = useMutation<LogOutData>(LogOut, {
        onCompleted: data => {
            if (data && data.logOut) {
                setViewer(data.logOut);
                sessionStorage.removeItem('token');
                displaySuccessNotification('You have successfully logged out!');
            }
        },
        onError: () => {
            displayErrorMessage('Sorry! We were not able to log you out. Please try again later!');
        }
    });

    const handleLogOut = () => logOut();

    const userAvatar = <Avatar src={ viewer.avatar }/>

    const subMenuLink = viewer.id ? (
        <SubMenu title={ userAvatar }>
            <Item key='/user'>
                <Link to={ `/user/${ viewer.id }` }>
                    <UserOutlined style={{ marginRight: 10 }} />
                    Profile
                </Link>
            </Item>
            <Item key='/logout'>
                <div onClick={ handleLogOut }>
                    <LogoutOutlined style={{ marginRight: 10 }} />
                    Log Out
                </div>
            </Item>
        </SubMenu>
    ) : (
        <Link to='/login'>
            <Item>
                <Button type='primary'>Sign In</Button>
            </Item>
        </Link>
    );

    return (
        <MenuContainer mode='horizontal' selectable={ false } className='menu'>
            <Item key='host'>
                <Link to='/host'>
                    <HomeOutlined style={{ marginRight: 10 }} />
                    Host
                </Link>
            </Item>

            <Item>
            { subMenuLink }
            </Item>
        </MenuContainer>
    );
};

export default Menu;
