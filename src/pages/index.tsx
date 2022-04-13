import { Box, Button, Stack, Typography } from '@mui/material';
import Link from 'next/link';

export default function Home() {
	return (
		<main>
			<Box
				sx={{
					display: 'flex',
					height: '100vh',
					flexDirection: 'column',
					justifyContent: 'space-between',
					padding: '2em 0',
				}}
			>
				<Stack
					spacing={1}
					sx={{ textAlign: 'center' }}
				>
					<Typography variant={'h1'}>Tech Meets Tech</Typography>
					<Typography variant={'h5'}>
						Meet your fellow Tech peers through common interests, communities,
						and events.
					</Typography>
				</Stack>
				<Link href={'/login'}>
					<Button
						variant={'contained'}
						sx={{ maxWidth: '10em', display: 'block', margin: '0 auto' }}
					>
						Get Started
					</Button>
				</Link>
			</Box>
		</main>
	);
}
