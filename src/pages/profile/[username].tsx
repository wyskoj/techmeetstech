import Navigation from "../../components/navigation";
import Router, { useRouter } from 'next/router';
import React, { useEffect, useState, useContext } from "react";
import {
	Alert,
	Avatar,
	Box,
	Button,
	Card,
	CardContent,
	Container,
	Grid,
	Skeleton,
	Snackbar,
	Typography
} from "@mui/material";
import { useAuthenticatedRoute, useDefaultAuthState } from "../../utils/hooks/firebase";
import { useProfile } from "../../utils/hooks/profile";
import { ordinal } from "../../utils/number";
import useTimeout from "../../utils/hooks/timeout";
import { Edit } from "@mui/icons-material";
import MuiAlert from "@mui/material/Alert";
import AppContext, { TMTContext } from "../../context/AppContext";

export default function Profile() {
	useAuthenticatedRoute();
	const router = useRouter();
	const context = useContext<TMTContext>(AppContext);

	const { username } = router.query

	const {user, loading: userLoading} = useDefaultAuthState();
	const {profile, loading: profileLoading, updateProfile} = useProfile();

	const [splitSecond, setSplitSecond] = useState(true);
	const [editSnack, setEditSnack] = useState(false);

	useEffect(() => {
		if (context) {
			setEditSnack(context.showSnackbar)
			context.showSnackbar = false;
		}
	}, [context])

	const handleEditSnackClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}
		setEditSnack(false);
	};

	useTimeout(() => setSplitSecond(false), 500);


	if (userLoading || profileLoading) {
		if (splitSecond) {
			return <Navigation />
		} else {
			return <>
				<Navigation/>
				<Container sx={{
					margin: "1em 0"
				}}>
					<Box sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center"
					}}>
						<Skeleton variant={"circular"} width={100} height={100}/>
						<Skeleton variant={"text"} width={"20em"} height={"2em"}/>
						<Skeleton variant={"text"} width={"10em"}/>
						<Skeleton variant={"text"} width={"80%"}/>
					</Box>
					<Grid
						container
						spacing={2}
						direction={"row"}
						justifyContent={"center"}
						alignItems={"stretch"}
						sx={{marginTop: "1em", minHeight: 150}}
					>
						<Grid item xs={4}>
							<Skeleton variant={"rectangular"} height={"100%"} width={"100%"}/>
						</Grid>
						<Grid item xs={4}>
							<Skeleton variant={"rectangular"} height={"100%"} width={"100%"}/>
						</Grid>
					</Grid>
				</Container>
			</>
		}
	} else if (user === null || profile === undefined) {
		return <>
			<Navigation/>
			<Container sx={{
				margin: "1em 0"
			}}>
				That profile {"doesn't"} exist.
			</Container>
		</>
	} else {
		let yearCaption = <></>;
		if (profile.year) {
			yearCaption = <>{profile.year}<sup>{ordinal(profile.year)}</sup> year</>
		}
		return <>
			<Navigation/>
			<Snackbar open={editSnack} autoHideDuration={6000} onClose={handleEditSnackClose}>
				<MuiAlert variant={"filled"} elevation={6} onClose={handleEditSnackClose} severity="success" sx={{ width: '100%' }}>
					Profile successfully edited!
				</MuiAlert>
			</Snackbar>
			<Container sx={{
				margin: "1em 0"
			}}>
				<Box sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center"
				}}>
					<Avatar sx={{width: 100, height: 100}} src={user?.photoURL ?? ""}>JW</Avatar>
					<Typography variant={"h4"}>{user.displayName}</Typography>
					<Typography variant={"body2"}
					            gutterBottom>{yearCaption}{profile.year && profile.major ? <>&nbsp;&mdash;&nbsp;</> : null}{profile.major}</Typography>
					<Typography variant={"body1"} gutterBottom>{profile.bio}</Typography>
					<Button variant={"contained"} color={"inherit"} startIcon={<Edit/>} sx={{fontSize: "x-small"}} onClick={() => {
						Router.push("/profile/edit")
					}}>
						Edit profile
					</Button>
				</Box>

				<Grid
					container
					spacing={2}
					direction={"row"}
					justifyContent={"center"}
					alignItems={"stretch"}
					sx={{marginTop: "1em"}}>
					<Grid item xs={4}>
						<Card>
							<CardContent>
								<Typography variant={"h5"}>Interests</Typography>
								<ul>
									<li>Programming</li>
									<li>Land surveying</li>
									<li>Music composition</li>
								</ul>
							</CardContent>
						</Card>
					</Grid>
					<Grid item xs={4}>
						<Card>
							<CardContent>
								<Typography variant={"h5"}>Communities</Typography>
								<ul>
									<li>Kube</li>
									<li>DHSC</li>
								</ul>
							</CardContent>
						</Card>
					</Grid>
				</Grid>


			</Container>
		</>
	}
}
