import React from 'react';
import { Alert } from 'antd';

interface ErrorBannerProps {
    message?: string;
    description?: string;
}

const ErrorBanner = ({
    message = 'Uh oh! Something went strong :(',
    description = 'Looks like something went wrong. Please check your connection and/or try again later.'
}: ErrorBannerProps) => (
    <Alert 
        banner
        closable
        message={ message }
        description={ description }
        type='error'
        className='error-banner'
    />
);

export default ErrorBanner;