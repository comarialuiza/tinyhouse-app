import { Layout } from 'antd';
import React, { Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/tinyhouse_logo.png';
import { Viewer } from '../lib/types';
import Menu from './Menu';

const { Header: HeaderContainer } = Layout;

interface HeaderProps {
    viewer: Viewer;
    setViewer: Dispatch<SetStateAction<Viewer>>;
}

const Header = ({ viewer, setViewer }: HeaderProps) => (
    <HeaderContainer className='app-header'>
        <div className="app-header__logo-search-section">
            <div className="app-header__logo">
                <Link to='/'>
                    <img src={ logo } alt='App logo' />
                </Link>
            </div>
        </div>
        <div className="app-header__menu-section">
            <Menu viewer={ viewer } setViewer={ setViewer } />
        </div>
    </HeaderContainer>
);

export default Header;