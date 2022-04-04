import Navigation from '../../components/navigation';
import {
	Alert,
	AlertColor,
	Box,
	Button,
	Chip,
	Container,
	Paper,
	Skeleton,
	Snackbar,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useAuthenticatedRoute } from '../../utils/hooks/firebase';
import { Add } from '@mui/icons-material';
import { useInterests } from '../../utils/hooks/interest';

export default function Interests() {
	useAuthenticatedRoute();

	const { interests, loading, updateInterests } = useInterests();

	/* Deleting a chip (an interest) */
	function handleDeleteChip(e: string) {
		if (interests) {
			const indexToRemove = interests.indexOf(e);
			interests.splice(indexToRemove, 1);
			updateInterests(interests);
		}
	}

	/* Text field content */
	const [field, setField] = useState('');

	function alert(message: string, severity: AlertColor) {
		setMessage(message);
		setSeverity(severity);
		setOpen(true);
	}

	/* Adding an interest */
	function handleAdd() {
		try {
			if ((interests?.length ?? 0) >= 100) {
				// Do not exceed 100 interests
				alert(
					"You're a very interesting person! But let's limit it to 100 interests.",
					'warning'
				);
				return;
			}

			if (field.trim() === '') {
				// Do not accept blank interests
				return;
			}

			if (
				interests?.find(
					(it) => it.toLowerCase().trim() === field.toLowerCase().trim()
				)
			) {
				// Do not accept duplicates
				alert(
					"We get it, you're interested! You've already listed this.",
					'warning'
				);
				return;
			}

			if (field.length > 100) {
				// Don't accept stupidly long interests (bro)
				alert(
					"That's pretty interesting! But let's keep it to 100 characters.",
					'warning'
				);
				return;
			}

			if (interests) {
				interests.push(field);
				updateInterests(interests);
			} else {
				updateInterests([field]);
			}
			setOpen(false);
			setField('');
		} catch (e) {
			console.error(e);
			alert(
				'There was an error saving your interest, try again later.',
				'error'
			);
		}
	}

	let interestsDisplay: JSX.Element[] | JSX.Element;
	// If there are any interests to display
	if (interests?.length) {
		interestsDisplay = interests?.map((value, index) => (
			<Chip
				sx={{ margin: '0.5em' }}
				key={index}
				label={value}
				onDelete={() => handleDeleteChip(value)}
			/>
		));
	} else {
		interestsDisplay = (
			<Typography sx={{ margin: '1em' }}>
				No interests. {"You're"} pretty boring!
			</Typography>
		);
	}

	/* for snackbar */
	const [open, setOpen] = useState(false);
	const [message, setMessage] = useState('');
	const [severity, setSeverity] = useState<AlertColor>('warning');
	const handleClose = (
		event?: React.SyntheticEvent | Event,
		reason?: string
	) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
	};
	if (loading) {
		return (
			<>
				<Navigation />
				<Container sx={{ marginTop: '1em' }}>
					<Stack
						spacing={2}
						sx={{ maxWidth: 500, display: 'block', margin: 'auto' }}
					>
						<Box>
							<Typography variant={'h4'}>Interests</Typography>
							<Typography variant={'body1'}>
								What are you interested in?
							</Typography>
						</Box>
						<Skeleton
							variant={'rectangular'}
							sx={{ height: 56 }}
						/>
					</Stack>
				</Container>
			</>
		);
	} else {
		return (
			<>
				<Navigation />
				<Snackbar
					open={open}
					autoHideDuration={6000}
					onClose={handleClose}
				>
					<Alert
						onClose={handleClose}
						severity={severity}
						sx={{ width: '100%' }}
					>
						{message}
					</Alert>
				</Snackbar>
				<Container sx={{ marginTop: '1em' }}>
					<Stack
						spacing={2}
						sx={{ maxWidth: 500, display: 'block', margin: 'auto' }}
					>
						<Box>
							<Typography variant={'h4'}>Interests</Typography>
							<Typography variant={'body1'}>
								What are you interested in?
							</Typography>
						</Box>
						<Paper
							elevation={2}
							sx={{ padding: '0.5em' }}
						>
							{interestsDisplay}
						</Paper>
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-between',
							}}
						>
							<TextField
								label={'What are you interested in?'}
								value={field}
								onChange={(e) => setField(e.target.value)}
								sx={{ flexGrow: 1, marginRight: '1em' }}
								onKeyPress={(event) => {
									if (event.code == 'Enter') {
										handleAdd();
									}
								}}
							/>
							<Button
								startIcon={<Add />}
								variant={'contained'}
								onClick={handleAdd}
							>
								Add
							</Button>
						</Box>
					</Stack>
				</Container>
			</>
		);
	}
}
