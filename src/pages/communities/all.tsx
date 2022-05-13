import Navigation from '../../components/navigation';
import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import React from 'react';
import Router from 'next/router';
import { useAllCommunities } from '../../utils/hooks/allCommunities';

export default function AllCommunities() {
	const { community, loading } = useAllCommunities();
	let element: JSX.Element[] | JSX.Element;
	if (community?.size) {
		element = community?.docs.map((doc) => (
			<Box
				sx={{
					mx: 'auto',
					my: 3,
					border: 2,
					width: 1 / 1.4,
					justifyContent: 'center',
				}}
			>
				<Box sx={{ textAlign: 'center' }}>
					<Typography>{doc.get('name')}</Typography>
				</Box>
				<Divider variant="middle" />
				<Box>
					<Typography
						sx={{
							margin: 0,
							textAlign: 'center',
							justifyContent: 'center',
							fontStyle: 'italic',
							fontSize: '0.75rem',
						}}
					>
						Leader: {doc.get('leader')}
					</Typography>
					<Button
						variant="contained"
						size="small"
						sx={{
							display: 'flex',
							mx: 'auto',
							my: 1,
							justifyContent: 'center',
						}}
						onClick={() => {
							Router.push('/communities/info&' + doc.id);
						}}
					>
						<Typography variant="button">More info</Typography>
					</Button>
				</Box>
			</Box>
		));
	} else {
		element = <Typography>Nothing to see!</Typography>;
	}
	if (loading) {
		return (
			<>
				<Navigation />
				<Stack></Stack>
			</>
		);
	} else {
		return (
			<>
				<Navigation />
				<Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
					{element}
				</Box>
			</>
		);
	}
}
