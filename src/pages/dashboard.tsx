import { useAuthenticatedRoute } from '../utils/hooks/firebase';
import Navigation from '../components/navigation';
import { Box, Container, Divider, Typography } from '@mui/material';

export default function Dashboard() {
	useAuthenticatedRoute();
	return (
		<>
			<Navigation />
			<Container>
				<Container>
					<Typography
						variant={'h2'}
						sx={{ textAlign: 'center' }}
					>
						Welcome to Tech Meets Tech!
					</Typography>
				</Container>
				<Container sx={{ mx: 'auto', width: 3 / 4 }}>
					<Divider variant="middle" />
					<Container>
						<Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)' }}>
							<Container sx={{ mx: 'auto', my: 3, textAlign: 'center' }}>
								<Typography>Joined Communities</Typography>
								<Box>
									<Typography>Community 1</Typography>
									<Typography>Community 2</Typography>
								</Box>
							</Container>
							<Container sx={{ mx: 'auto', my: 3, textAlign: 'center' }}>
								<Typography>Joined Events</Typography>
								<Box>
									<Typography>Event 1</Typography>
									<Typography>Event 2</Typography>
								</Box>
							</Container>
							<Container sx={{ mx: 'auto', textAlign: 'center' }}>
								<Typography>Friends</Typography>
								<Box>
									<Typography>Friend 1</Typography>
									<Typography>Friend 2</Typography>
								</Box>
							</Container>
							<Container sx={{ mx: 'auto', textAlign: 'center' }}>
								<Typography>Classes</Typography>
								<Box>
									<Typography>Class 1</Typography>
									<Typography>Class 2</Typography>
								</Box>
							</Container>
						</Box>
					</Container>
				</Container>
			</Container>
		</>
	);
}
