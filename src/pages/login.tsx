import {
	Alert,
	Box,
	Button,
	CircularProgress,
	Snackbar,
	Stack,
	Typography,
} from '@mui/material';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useDefaultAuthState } from '../utils/hooks/firebase';
import Router from 'next/router';
import React, { useEffect } from 'react';
import Husky from '/public/images/husky.svg';
import { doc, getFirestore, setDoc } from 'firebase/firestore';

async function handleOnClick(
	setErrorOpen: (value: ((prevState: boolean) => boolean) | boolean) => void
) {
	try {
		const provider = new GoogleAuthProvider();
		provider.setCustomParameters({
			hd: 'mtu.edu',
		});
		const userCredential = await signInWithPopup(getAuth(), provider);
		await setDoc(doc(getFirestore(), `/accounts/${userCredential.user.uid}`), {
			displayName: userCredential.user.displayName,
			email: userCredential.user.email,
			photoURL: userCredential.user.photoURL,
		});
	} catch (e) {
		console.error(e);
		setErrorOpen(true);
	}
}

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
		// Closing of snackbar
		setErrorOpen(false);
	}

	return (
		<>
			<Stack
				spacing={2}
				sx={{
					maxWidth: 400,
					margin: 'auto',
					textAlign: 'center',
					marginTop: '1em',
				}}
			>
				<Typography
					component={'h1'}
					variant={'h5'}
				>
					Log in
				</Typography>
				<Typography variant={'body1'}>
					Sign in with your Michigan Tech email to get started.
				</Typography>
				{user || loading ? (
					<Box>
						<CircularProgress />
					</Box>
				) : (
					<>
						<Button
							variant={'contained'}
							onClick={async () => {
								await handleOnClick(setErrorOpen);
							}}
							sx={{
								margin: '0.5em',
								padding: '0.75em 3em',
							}}
						>
							<Husky height={50} />
							<Typography
								sx={{
									marginLeft: '1em',
									fontWeight: 'bold',
								}}
							>
								Sign in
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
			</Stack>
		</>
	);
}
