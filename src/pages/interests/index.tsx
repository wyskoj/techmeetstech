import Navigation from "../../components/navigation";
import { useInterests } from "../../utils/hooks/interests";
import {
	Box, Card,
	CardContent,
	Container, Divider,
	IconButton,
	List,
	ListItem, ListItemButton,
	ListItemText,
	Stack,
	Typography
} from "@mui/material";
import { Delete } from "@mui/icons-material";

export default function Interests() {
	const {interests} = useInterests();
	console.log(interests);
	return <>
		<Navigation />
		<Container sx={{marginTop: "1em"}}>
			<Stack spacing={2}>
				<Box>
					<Typography variant={"h4"}>Interests</Typography>
					<Typography variant={"body1"}>What are you interested in?</Typography>
				</Box>
				<Card>
					<CardContent>

					</CardContent>
				</Card>

			</Stack>
		</Container>
	</>
}