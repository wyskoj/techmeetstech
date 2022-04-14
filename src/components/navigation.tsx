import {
	Avatar,
	Button,
	Divider,
	Menu,
	MenuItem,
	Tooltip,
} from '@mui/material';
import React, { useRef, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PersonIcon from '@mui/icons-material/Person';
import Router from 'next/router';
import TMTLogo from '../../public/tmt.svg';
import {
	useAuthenticatedRoute,
	useDefaultAuthState,
} from '../utils/hooks/firebase';

function NavbarButton(props: { text: string; url: string }) {
	return (
		<Button
			variant={'text'}
			color={'inherit'}
			onClick={() => Router.push(props.url)}
		>
			{props.text}
		</Button>
	);
}

export default function Navigation() {
	useAuthenticatedRoute();

	const profileMenuAnchor = useRef<HTMLButtonElement>(null);
	const [profileMenuOpen, setProfileMenuOpen] = useState(false);

	const { user } = useDefaultAuthState();

	if (!user) return null;

	return (
		<>
			<AppBar
				position={'static'}
				sx={{ display: 'flex', flexFlow: 'row' }}
			>
				<Box sx={{ flexGrow: 0, marginLeft: '1em' }}>
					<TMTLogo
						style={{
							width: 250,
							height: '100%',
						}}
					/>
				</Box>
				<Box sx={{ flexGrow: 1 }}>
					<Toolbar>
						<NavbarButton
							text={'Dashboard'}
							url={'/dashboard'}
						/>
						<NavbarButton
							text={'Communities'}
							url={'/communities'}
						/>
						<NavbarButton
							text={'My Interests'}
							url={'/interests'}
						/>
					</Toolbar>
				</Box>
				<Box sx={{ flexGrow: 0 }}>
					<Menu
						open={profileMenuOpen}
						onClose={() => setProfileMenuOpen(false)}
						anchorEl={profileMenuAnchor.current}
					>
						<MenuItem
							onClick={() => {
								setProfileMenuOpen(false);
								Router.push(`/profile/${user?.uid}`);
							}}
						>
							My profile
						</MenuItem>
						<Divider />
						<MenuItem
							onClick={() => {
								setProfileMenuOpen(false);
								Router.push('/signout');
							}}
						>
							Log out
						</MenuItem>
					</Menu>
					<Toolbar>
						<Typography sx={{ mr: 1 }}>{user?.displayName ?? ''}</Typography>
						<Tooltip title={'Profile settings'}>
							<IconButton
								onClick={() => setProfileMenuOpen(true)}
								ref={profileMenuAnchor}
							>
								<Avatar src={user?.photoURL ?? ''}>
									<PersonIcon />
								</Avatar>
							</IconButton>
						</Tooltip>
					</Toolbar>
				</Box>
			</AppBar>
		</>
	);
}
