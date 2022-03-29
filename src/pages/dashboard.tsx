import {useAuthenticatedRoute} from "../utils/hooks/firebase";
import {Button} from "@mui/material";
import {getAuth, signOut} from "firebase/auth";
import Navigation from "../components/navigation";

export default function Dashboard() {
    useAuthenticatedRoute();

    return <>
        <Navigation title={"Dashboard"} />
        <Button variant={"contained"} onClick={() => {
            signOut(getAuth());
        }}>Sign out</Button>

    </>
}
