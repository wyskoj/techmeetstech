import { Box, Typography } from '@mui/material';
import Link from 'next/link';
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
				<Typography variant={'body2'}>
					If you aren&apos;t redirected, you can go to the&#32;
					<Link href={'/'}>homepage</Link>.
				</Typography>
			</Box>
		</>
	);
}
