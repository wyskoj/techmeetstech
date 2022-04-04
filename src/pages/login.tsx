import { Alert, Box, Button, Snackbar, Typography } from '@mui/material';
import { Google } from '@mui/icons-material';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useDefaultAuthState } from '../utils/hooks/firebase';
import Router from 'next/router';
import React, { useEffect } from 'react';

export default function Login() {
	const { user, loading } = useDefaultAuthState();

	useEffect(() => {
		if (user) {
			if (Router.query.next === 'prev') {
				Router.back();
			} else {
				Router.push('/dashboard');
			}
		}
	}, [user]);

	/* Google login error snackbar */
	const [errorOpen, setErrorOpen] = React.useState(false);

	function handleClose() {
		setErrorOpen(false);
	}

	return (
		<>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					flexDirection: 'column',
				}}
			>
				<Typography
					component={'h1'}
					variant={'h5'}
					sx={{
						margin: '0.5em',
					}}
				>
					Log in
				</Typography>
				<Typography
					variant={'body1'}
					sx={{
						margin: '0.5em',
					}}
				>
					Sign in with your Michigan Tech email to get started.
				</Typography>
				{user || loading ? (
					<p>Loading...</p>
				) : (
					<>
						<Button
							variant={'contained'}
							onClick={async () => {
								try {
									const provider = new GoogleAuthProvider();
									provider.setCustomParameters({
										hd: 'mtu.edu',
									});
									await signInWithPopup(getAuth(), provider);
								} catch (e) {
									setErrorOpen(true);
								}
							}}
							sx={{
								margin: '0.5em',
								padding: '0.75em 3em',
							}}
						>
							<Google />
							<Typography
								sx={{
									marginLeft: '0.75em',
								}}
							>
								Sign in with Google
							</Typography>
						</Button>
						<Snackbar
							open={errorOpen}
							autoHideDuration={6000}
							onClose={handleClose}
						>
							<Alert
								onClose={handleClose}
								severity="error"
								sx={{ width: '100%' }}
							>
								Sign in with Google failed.
							</Alert>
						</Snackbar>
					</>
				)}
			</Box>
		</>
	);
}
