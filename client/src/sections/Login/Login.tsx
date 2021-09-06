import { useApolloClient, useMutation } from '@apollo/client';
import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { Card, Layout, Typography, Spin } from 'antd';
import { Viewer } from '../../lib/types';
import googleLogo from '../../images/google_logo.jpg';
import AuthUrl from '../../lib/graphql/queries/AuthUrl';
import { AuthUrl as AuthUrlData } from '../../lib/graphql/queries/__generated__/AuthUrl';
import { LogIn as LogInData, LogInVariables } from '../../lib/graphql/mutations/__generated__/LogIn';
import LogIn from '../../lib/graphql/mutations/LogIn'; 
import LogOut from '../../lib/graphql/mutations/LogOut';
import ErrorBanner from '../../components/ErrorBanner';
import { displaySuccessNotification, displayErrorMessage } from '../../utils/NotificationUtils';
import { Redirect } from 'react-router';

const { Content } = Layout;
const { Text, Title } = Typography;

interface LoginProps {
	setViewer: Dispatch<SetStateAction<Viewer>>;
}

const Login = ({ setViewer }: LoginProps) => {
	const client = useApolloClient();

	const [logIn, {
		data: logInData,
		loading: logInLoading,
		error: logInError
	}] = useMutation<LogInData, LogInVariables>(LogIn, {
		onCompleted: (data) => {
			if (data && data.logIn) {
				setViewer(data.logIn);
				displaySuccessNotification('You have successfully logged in!');
			}
		}
	});

	const logInRef = useRef(logIn);

	useEffect(() => {
		const code = new URL(window.location.href).searchParams.get('code');

		if (code) {
			logInRef.current({
				variables: {
					input: { code }
				}
			});
		}
	}, []);

	const handleAuthorize = async () => {
		try {
			const { data } = await client.query<AuthUrlData>({
				query: AuthUrl
			});

			window.location.href = data.authUrl;
		} catch (err) {
			displayErrorMessage('Sorry, we were not able to log you in. Please try again later.');
		}
	}

	if (logInLoading) {
		return (
			<Content className='log-in'>
				<Spin size='large' tip='Logging you in...' />
			</Content>
		)
	}

	if (logInData && logInData.logIn) {
		const { id: viewerId } = logInData.logIn;
		return <Redirect to={ `/user/${ viewerId }` } />
	}

	const logInErrorBanner = logInError ? (
		<ErrorBanner description='Sorry, we were not able to log you in. Please try again later.' />
	) : null;

	return (
		<Content className='log-in'>
			{ logInErrorBanner }
			<Card className='log-in-card'>
				<div className='log-in-card__intro'>
					<Title level={3} className='log-in-card__intro-title'>
						<span role='img' aria-label='wave'>
							👋
						</span>
					</Title>
					<Title level={3} className='log-in-card__intro-title'>
						Log in to TinyHouse!
					</Title>
					<Text>Sign in with Google to start booking available rentals!</Text>
				</div>
				<button className='log-in-card__google-button' onClick={ handleAuthorize }>
					<img
						src={googleLogo}
						alt='Google Logo'
						className='log-in-card__google-button-logo'
					/>
					<span className='log-in-card__google-button-text'>
						Sign in with Google
					</span>
				</button>
				<Text type='secondary'>
					Note: By signing in, you'll be redirected to the Google consent form
					to sign in with your Google account.
				</Text>
			</Card>
		</Content>
	);
};

export default Login;
