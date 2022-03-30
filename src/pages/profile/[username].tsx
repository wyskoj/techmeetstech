import Navigation from "../../components/navigation";
import Router, {useRouter} from 'next/router';
import React, {useContext, useEffect, useState} from "react";
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
    Typography
} from "@mui/material";
import {useAuthenticatedRoute, useDefaultAuthState} from "../../utils/hooks/firebase";
import {useProfile} from "../../utils/hooks/profile";
import {ordinal} from "../../utils/number";
import {Edit} from "@mui/icons-material";
import MuiAlert from "@mui/material/Alert";
import AppContext, {TMTContext} from "../../context/AppContext";
import {getTechUsername} from "../../utils/michigantech";
import useSplitSecond from "../../utils/hooks/splitsecond";

function EditProfileButton() {
    return <Button variant={"contained"}
                   color={"secondary"}
                   startIcon={<Edit/>}
                   sx={{fontSize: "x-small"}}
                   onClick={() => {
                       Router.push("/profile/edit")
                   }}>
        Edit profile
    </Button>
}

export default function Profile() {
    useAuthenticatedRoute();
    const router = useRouter();
    const context = useContext<TMTContext>(AppContext);
    const {username} = router.query
    const {user, loading: userLoading} = useDefaultAuthState();
    const {profile, loading: profileLoading} = useProfile();
    const splitSecond = useSplitSecond();
    const [editSnack, setEditSnack] = useState(false);

    /* Show snackbar if context says to */
    useEffect(() => {
        if (context) {
            setEditSnack(context.showSnackbar)
            context.showSnackbar = false;
        }
    }, [context])

    /* Handle snackbar closing */
    const handleEditSnackClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setEditSnack(false);
    };


    if (userLoading || profileLoading) { // If content is loading
        if (splitSecond) { // But we just opened the page
            return <Navigation/>
        } else { // If it's been a short while
            return <>
                <Navigation/>
                <Container sx={{margin: "1em 0"}}>
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
                        sx={{marginTop: "1em", minHeight: 150}}>
                        <Grid item xs={4}><Skeleton variant={"rectangular"} height={"100%"} width={"100%"}/></Grid>
                        <Grid item xs={4}><Skeleton variant={"rectangular"} height={"100%"} width={"100%"}/></Grid>
                    </Grid>
                </Container>
            </>
        }
    } else if (user === null || profile === undefined) {
        return <>
            <Navigation/>
            <Container sx={{margin: "1em 0"}}>
                That profile {"doesn't"} exist.
            </Container>
        </>
    } else {
        let yearCaption = <></>;
        if (profile.year) {
            yearCaption = <>{profile.year}<sup>{ordinal(profile.year)}</sup> year</>
        }
        let initials = user.displayName?.split(" ").map(it => it.substring(0, 1));
        return <>
            <Navigation/>
            <Snackbar open={editSnack} autoHideDuration={6000} onClose={handleEditSnackClose}>
                <MuiAlert variant={"filled"}
                          elevation={6}
                          onClose={handleEditSnackClose}
                          severity="success"
                          sx={{width: '100%'}}>
                    Profile successfully edited!
                </MuiAlert>
            </Snackbar>
            <Container sx={{margin: "1em 0"}}>
                <Box sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <Avatar sx={{width: 100, height: 100}} src={user?.photoURL ?? ""}>{initials}</Avatar>
                    <Typography variant={"h4"}>{user.displayName}</Typography>
                    <Typography variant={"body2"} gutterBottom>
                        {yearCaption}{profile.year && profile.major ? <>&nbsp;&mdash;&nbsp;</> : null}{profile.major}
                    </Typography>
                    <Typography variant={"body1"} gutterBottom>{profile.bio}</Typography>
                    {username === getTechUsername(user) ? <EditProfileButton/> : null}
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
                                <Box sx={{display: "flex", alignItems: "center"}}>
                                    <Typography variant={"h5"}>Interests</Typography>
                                    <IconButton onClick={() => Router.push("/interests")}><Edit/></IconButton>
                                </Box>
                                <ul>{profile.interests.map(it => <li key={it}>{it}</li>)}</ul>
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
