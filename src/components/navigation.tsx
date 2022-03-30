import { Avatar, Button, Divider, Menu, MenuItem, Tooltip } from "@mui/material";
import React, { useRef, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PersonIcon from '@mui/icons-material/Person';
import Router from "next/router";
import TMTLogo from "../../public/tmt.svg";
import { useDefaultAuthState } from "../utils/hooks/firebase";
import { getTechUsername } from "../utils/michigantech";

export default function Navigation() {
	const profileMenuAnchor = useRef<HTMLButtonElement>(null);
	const [profileMenuOpen, setProfileMenuOpen] = useState(false);

	const { user } = useDefaultAuthState();

	return <>
		<AppBar position={"static"} sx={{display: "flex", flexFlow: "row"}}>
			<Box sx={{flexGrow: 0, marginLeft: "1em"}}>
						<TMTLogo style={{
							width: 250,
							height: "100%"
						}}/>
			</Box>
			<Box sx={{flexGrow: 1}}>
				<Toolbar>
					<Button variant={"text"} color={"inherit"} onClick={() => {
						Router.push("/dashboard")
					}}>
						Dashboard
					</Button>
					<Button variant={"text"} color={"inherit"} onClick={() => {
						Router.push("/communities")
					}}>
						Communities
					</Button>
					<Button variant={"text"} color={"inherit"} onClick={() => {
						Router.push("/interests")
					}}>
						My Interests
					</Button>
				</Toolbar>
			</Box>
			<Box sx={{flexGrow: 0}}>
				<Menu
					open={profileMenuOpen}
					onClose={() => {
						setProfileMenuOpen(false);
					}}
					anchorEl={profileMenuAnchor.current}>
					<MenuItem onClick={() => {
						setProfileMenuOpen(false);
						Router.push(`/profile/${getTechUsername(user!)}`)
					}}>My profile</MenuItem>
					<Divider/>
					<MenuItem onClick={() => {
						setProfileMenuOpen(false);
						Router.push("/signout");
					}}>Log out</MenuItem>
				</Menu>

				<Toolbar>
					<Typography sx={{mr: 1}}>{user?.displayName ?? ""}</Typography>
					<Tooltip title={"Profile settings"}>
						<IconButton
							onClick={() => {
								setProfileMenuOpen(true);
							}}
							ref={profileMenuAnchor}>
							<Avatar src={user?.photoURL ?? ""}>
								<PersonIcon/>
							</Avatar>
						</IconButton>
					</Tooltip>
				</Toolbar>
			</Box>
		</AppBar>
	</>
}
