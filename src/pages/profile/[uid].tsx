import Navigation from '../../components/navigation';
import Router, { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import {
	Avatar,
	Box,
	Button,
	Card,
	CardContent,
	Container,
	Grid,
	IconButton,
	Skeleton,
	Snackbar,
	Stack,
	Typography,
} from '@mui/material';
import {
	useAuthenticatedRoute,
	useDefaultAuthState,
} from '../../utils/hooks/firebase';
import { useProfile } from '../../utils/hooks/profile';
import { ordinal } from '../../utils/number';
import { Edit } from '@mui/icons-material';
import AppContext, { TMTContext } from '../../context/AppContext';
import useSplitSecond from '../../utils/hooks/splitsecond';
import MuiAlert from '@mui/material/Alert';
import { Profile } from '../../types/profile';
import { useAccount } from '../../utils/hooks/account';
import { Account } from '../../types/account';

function EditProfileButton() {
	return (
		<Button
			variant={'contained'}
			color={'secondary'}
			startIcon={<Edit />}
			sx={{ fontSize: 'x-small' }}
			onClick={() => Router.push('/profile/edit')}
		>
			Edit profile
		</Button>
	);
}

function ProfileSkeleton() {
	return (
		<>
			<Navigation />
			<Container sx={{ margin: '1em 0' }}>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Skeleton
						variant={'circular'}
						width={100}
						height={100}
					/>
					<Skeleton
						variant={'text'}
						width={'20em'}
						height={'2em'}
					/>
					<Skeleton
						variant={'text'}
						width={'10em'}
					/>
					<Skeleton
						variant={'text'}
						width={'80%'}
					/>
				</Box>
				<Grid
					container
					spacing={2}
					direction={'row'}
					justifyContent={'center'}
					alignItems={'stretch'}
					sx={{ marginTop: '1em', minHeight: 150 }}
				>
					<Grid
						item
						xs={4}
					>
						<Skeleton
							variant={'rectangular'}
							height={'100%'}
							width={'100%'}
						/>
					</Grid>
					<Grid
						item
						xs={4}
					>
						<Skeleton
							variant={'rectangular'}
							height={'100%'}
							width={'100%'}
						/>
					</Grid>
				</Grid>
			</Container>
		</>
	);
}

function initials(name: string | null): string {
	if (name) {
		return name
			.split(' ')
			.map((it) => it.substring(0, 1))
			.join('');
	} else {
		return '';
	}
}

function ProfileContents(props: {
	uid: string;
	profile: Profile;
	account: Account;
	selfProfile: boolean;
}) {
	const [editSnack, setEditSnack] = useState(false);
	const context = useContext<TMTContext>(AppContext);

	/* Show snackbar if context says to */
	useEffect(() => {
		if (context) {
			setEditSnack(context.showSnackbar);
			context.showSnackbar = false;
		}
	}, [context]);

	/* Handle snackbar closing */
	const handleEditSnackClose = (
		event?: React.SyntheticEvent | Event,
		reason?: string
	) => {
		if (reason === 'clickaway') {
			return;
		}
		setEditSnack(false);
	};

	const yearCaption = (
		<>
			{props.profile.year}
			<sup>{ordinal(props.profile.year)}</sup> year
		</>
	);

	const interestsElements = props.profile.interests
		? props.profile.interests.map((it) => <li key={it}>{it}</li>)
		: null;

	const communitiesElements = props.profile.joinedCommunities
		? props.profile.joinedCommunities.map((it) => <li key={it}>{it}</li>)
		: null;

	return (
		<>
			<Snackbar
				open={editSnack}
				autoHideDuration={6000}
				onClose={handleEditSnackClose}
			>
				<MuiAlert
					variant={'filled'}
					elevation={6}
					onClose={handleEditSnackClose}
					severity="success"
					sx={{ width: '100%' }}
				>
					Your changes were saved.
				</MuiAlert>
			</Snackbar>
			<Container sx={{ margin: '1em 0' }}>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Avatar
						sx={{ width: 100, height: 100 }}
						src={props.account.photoURL ?? ''}
					>
						{initials(props.account.displayName)}
					</Avatar>
					<Typography variant={'h4'}>{props.account.displayName}</Typography>
					<Typography
						variant={'body2'}
						gutterBottom
					>
						{yearCaption}
						{props.profile.year && props.profile.major ? (
							<>&nbsp;&mdash;&nbsp;</>
						) : null}
						{props.profile.major}
					</Typography>
					<Typography
						variant={'body1'}
						gutterBottom
					>
						{props.profile.bio}
					</Typography>
					{props.selfProfile ? <EditProfileButton /> : null}
				</Box>

				<Grid
					container
					spacing={2}
					direction={'row'}
					justifyContent={'center'}
					alignItems={'stretch'}
					sx={{ marginTop: '1em' }}
				>
					<Grid
						item
						xs={4}
					>
						<Card>
							<CardContent>
								<Box sx={{ display: 'flex', alignItems: 'center' }}>
									<Typography variant={'h5'}>Interests</Typography>
									{props.selfProfile ? (
										<IconButton onClick={() => Router.push('/interests')}>
											<Edit />
										</IconButton>
									) : null}
								</Box>
								<ul>{interestsElements}</ul>
							</CardContent>
						</Card>
					</Grid>
					<Grid
						item
						xs={4}
					>
						<Card>
							<CardContent>
								<Typography variant={'h5'}>Communities</Typography>
								<ul>{communitiesElements}</ul>
							</CardContent>
						</Card>
					</Grid>
				</Grid>
			</Container>
		</>
	);
}

export default function ProfilePage() {
	useAuthenticatedRoute();
	const router = useRouter();
	const splitSecond = useSplitSecond();
	const { user } = useDefaultAuthState();
	const { uid } = router.query;
	const { profile, loading: profileLoading } = useProfile(uid as string);
	const { account, loading: accountLoading } = useAccount(uid as string);

	if (profileLoading || accountLoading || !user) {
		if (splitSecond) {
			return <Navigation />;
		} else {
			return <ProfileSkeleton />;
		}
	}

	if (!profile || !account) {
		// User has not configured profile
		if (user.uid === uid) {
			return (
				<>
					<Navigation />
					<Container sx={{ margin: '1em 0' }}>
						<Stack
							sx={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
							}}
							spacing={2}
						>
							<Typography>
								<b>You don&apos;t have a profile setup yet!</b> Let&apos;s get
								started.
							</Typography>
							<EditProfileButton />
						</Stack>
					</Container>
				</>
			);
		} else {
			return (
				<>
					<Navigation />
					<Container sx={{ margin: '1em 0' }}>
						<Stack
							sx={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
							}}
							spacing={2}
						>
							<Typography>
								<b>That user doesn&apos;t have a profile setup yet!</b>
							</Typography>
						</Stack>
					</Container>
				</>
			);
		}
	}

	return (
		<>
			<Navigation />
			<ProfileContents
				uid={uid as string}
				profile={profile}
				account={account}
				selfProfile={user.uid === uid}
			/>
		</>
	);
}
