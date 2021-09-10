import { Layout } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/tinyhouse_logo.png';

const { Header: HeaderContainer } = Layout;

const HeaderSkeleton = () => (
    <HeaderContainer className='app-header'>
        <div className="app-header__logo-search-section">
            <div className="app-header__logo">
                <Link to='/'>
                    <img src={ logo } alt='App logo' />
                </Link>
            </div>
        </div>
    </HeaderContainer>
);

export default HeaderSkeleton;
