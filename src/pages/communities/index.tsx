import Navigation from "../../components/navigation";
import { Box, Container, Stack, Typography } from "@mui/material";


export default function Communities() {
	return <>
		<Navigation/>
		<Container sx={{marginTop: "1em"}}>
			<Stack spacing={2}>
				<Box>
					<Typography variant={"h4"}>Communities</Typography>
					<Typography variant={"body1"}>View and join communities based on your interests.</Typography>
				</Box>
			</Stack>

		</Container>
	</>
}