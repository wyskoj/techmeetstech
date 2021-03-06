import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';
import Router from 'next/router';
import { sleep } from '../utils/time';
import { getAuth } from 'firebase/auth';

export default function SignOut() {
	useEffect(() => {
		(async () => {
			await getAuth().signOut();
			await sleep(0.25);

			await Router.push('/');
		})();
	}, []);
	return (
		<>
			<Box
				sx={{
					height: '100vh',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					flexDirection: 'column',
				}}
			>
				<Typography variant={'body1'}>Signing out...</Typography>
			</Box>
		</>
	);
}
