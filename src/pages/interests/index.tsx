import Navigation from "../../components/navigation";
import {Box, Button, Chip, Container, Paper, Stack, TextField, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useAuthenticatedRoute} from "../../utils/hooks/firebase";
import {useProfile} from "../../utils/hooks/profile";
import {Add} from "@mui/icons-material";


export default function Interests() {
    useAuthenticatedRoute();

    const {profile, updateProfile} = useProfile();
    const [interests, setInterests] = useState<string[]>();

    useEffect(() => {
        setInterests(profile?.interests)
    }, [profile]);

    /* Deleting a chip (an interest) */
    function handleDeleteChip(e: string) {
        if (interests && profile) {
            let indexToRemove = interests?.indexOf(e);
            interests?.splice(indexToRemove, 1);
            updateProfile({...profile, interests})
        }
    }

    /* Text field content */
    const [field, setField] = useState("");

    /* Adding an interest */
    function handleAdd() {
        if (field && !interests?.find(it => it.toLowerCase() === field.toLowerCase())) {
            interests?.push(field);
            setInterests(interests);
            setField("");
            if (interests && profile) {
                updateProfile({...profile, interests});
            }
        }
    }

    let interestsDisplay: JSX.Element[] | JSX.Element;
    // If there are any interests to display
    if (interests?.length) {
        interestsDisplay = interests?.map((value, index) =>
            <Chip sx={{margin: "0.5em"}}
                  key={index}
                  label={value}
                  onDelete={() => {
                      handleDeleteChip(value)
                  }}/>
        );
    } else {
        interestsDisplay = <Typography sx={{margin: "1em"}}>No interests. {"You're"} pretty boring!</Typography>;
    }

    return <>
        <Navigation/>
        <Container sx={{marginTop: "1em"}}>
            <Stack spacing={2} sx={{maxWidth: 500, display: "block", margin: "auto"}}>
                <Box>
                    <Typography variant={"h4"}>Interests</Typography>
                    <Typography variant={"body1"}>What are you interested in?</Typography>
                </Box>
                <Paper elevation={2} sx={{padding: "0.5em"}}>
                    {interestsDisplay}
                </Paper>
                <Box sx={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                    <TextField
                        label={"What are you interested in?"}
                        value={field}
                        onChange={(e) => setField(e.target.value)}
                        sx={{flexGrow: 1, marginRight: "1em"}}
                        onKeyPress={event => {
                            if (event.code == "Enter") {
                                handleAdd();
                            }
                        }}
                    />
                    <Button startIcon={<Add/>} variant={"contained"} onClick={handleAdd}>Add</Button>
                </Box>
            </Stack>
        </Container>
    </>
}
