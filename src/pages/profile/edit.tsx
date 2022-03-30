import { useAuthenticatedRoute, useDefaultAuthState } from "../../utils/hooks/firebase";
import Navigation from "../../components/navigation";
import { Autocomplete, Box, Button, Container, Skeleton, Slider, Stack, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { ordinal } from "../../utils/number";
import { Cancel, Save } from "@mui/icons-material";
import { useProfile } from "../../utils/hooks/profile";
import Router from "next/router";
import { getTechUsername } from "../../utils/michigantech";
import { User } from "firebase/auth";
import AppContext from "../../context/AppContext";
import useTimeout from "../../utils/hooks/timeout";

const majors = [
	"Accounting",
	"Accounting Analytics",
	"Actuarial Science",
	"Advanced Computational Physics",
	"Advanced Electric Power Engineering",
	"Advanced Photogrammetry and Mapping with UAS",
	"Aerodynamics",
	"Aerospace Engineering",
	"Aerospace Studies",
	"Alternative Energy Technology",
	"American Studies",
	"Anthropology",
	"Applied Cognitive Science and Human Factors",
	"Applied Ecology",
	"Applied Natural Resource Economics",
	"Applied Science Education",
	"Applied Statistics",
	"Applied Statistics Certificate",
	"Art",
	"Artificial Intelligence in Healthcare",
	"Astrophysics",
	"Atmospheric Sciences",
	"Audio Production and Technology",
	"Automotive Systems and Controls",
	"Big Data Statistics in Astrophysics",
	"Biochemistry and Molecular Biology",
	"Bioethics",
	"Bioinformatics",
	"Biological Sciences",
	"Biomaterials",
	"Biomedical Engineering",
	"Bioprocess Engineering",
	"Business",
	"Business Administration",
	"Business Analytics",
	"Business of Forestry",
	"Chemical Engineering",
	"Chemistry",
	"Chemistry, Pharmaceutical",
	"Civil Engineering",
	"Coaching Endorsement",
	"Coaching Fundamentals",
	"Communication Studies",
	"Communication, Culture, and Media",
	"Computational Chemistry and Chemical Informatics",
	"Computational Fluid Dynamics",
	"Computational Materials Science",
	"Computational Science and Engineering",
	"Computer Engineering",
	"Computer Network and System Administration",
	"Computer Science",
	"Construction Management",
	"Control Systems",
	"Cybersecurity",
	"Data Acquisition and Industrial Control",
	"Data Science",
	"Data Science Foundations",
	"Diversity Studies",
	"Dynamic Systems",
	"Earth Sciences",
	"Ecology",
	"Ecology and Environmental Science, Applied",
	"Ecology and Evolutionary Biology",
	"Economics",
	"Electric Power Engineering",
	"Electrical and Computer Engineering",
	"Electrical Engineering",
	"Electrical Engineering Technology",
	"Electronic Materials",
	"Electronics Materials and Processing",
	"Engineering",
	"Engineering Management",
	"Engineering Mechanics",
	"Engineering Sustainability and Resilience",
	"English",
	"Enterprise",
	"Environmental and Energy Policy",
	"Environmental Engineering",
	"Environmental Engineering PhD",
	"Environmental Engineering Science",
	"Environmental Science and Sustainability",
	"Environmental Studies",
	"Ethics and Philosophy",
	"Exercise Science",
	"Finance",
	"Financial Technology",
	"Fish Biology",
	"Forensic Accounting",
	"Forest Ecology Management",
	"Forest Molecular Genetics and Biotechnology",
	"Forest Science",
	"Forestry MF",
	"Forestry",
	"French",
	"French International",
	"Frontiers in Materials Physics",
	"Frontiers in Optics, and Photonics",
	"Fundamentals of Materials Engineering",
	"General Business",
	"General Computing",
	"General Engineering",
	"General Sciences and Arts",
	"Geographic Information Science",
	"Geoinformatics",
	"Geological Engineering",
	"Geology",
	"Geophysics",
	"Geophysics, Applied",
	"Geospatial Engineering",
	"Geospatial Data Science and Technology",
	"German",
	"German International",
	"Global Business",
	"Global Community Development Partnerships",
	"Health Informatics",
	"Historical Studies",
	"History",
	"Human Biology",
	"Human Factors",
	"Humanitarian Engineering",
	"Humanities",
	"Hybrid Electric Drive Vehicle Engineering",
	"Industrial Heritage and Archaeology",
	"Integrated Geospatial Technology",
	"Integrative Physiology",
	"International Studies",
	"Journalism",
	"Kinesiology",
	"Law and Society",
	"Leadership",
	"Management",
	"Management Information Systems",
	"Manufacturing",
	"Manufacturing Engineering",
	"Manufacturing Systems",
	"Marketing",
	"Materials Science and Engineering",
	"Math + Computer Science",
	"Mathematical Sciences",
	"Mechanical Engineering",
	"Mechanical Engineering Technology",
	"Mechanical Engineering-Engineering Mechanics",
	"Mechatronics",
	"Media Production",
	"Medical Devices and Instrumentation",
	"Medical Devices and Technologies",
	"Medical Imaging",
	"Medical Laboratory Science",
	"Microbiology",
	"Military Arts and Science",
	"Minerals Processing",
	"Mining Engineering",
	"Municipal Engineering",
	"Music",
	"Music Composition",
	"Music Performance",
	"Nanoscale Science and Engineering",
	"Natural Hazards and Disaster Risk Reduction",
	"Natural Resource and Environmental Economics",
	"Natural Resources Management",
	"Naval Systems Engineering",
	"Network and Communication Systems",
	"Peace Corps Coverdell Fellows Program",
	"Physics",
	"Applied Physics",
	"Plant Biotechnology",
	"Plant Sciences",
	"Polymer Science and Engineering",
	"Post-Secondary STEM Education",
	"Pre-Health Professions",
	"Profit-Increasing Strategies in Chemical Processing",
	"Psychology",
	"Public Health",
	"Quality Engineering",
	"Rail Transportation",
	"Resilient Water Infrastructure",
	"Rhetoric, Theory and Culture",
	"Robotics Engineering",
	"Safety and Security of Autonomous Cyber-Physical Systems",
	"Scientific and Technical Communication",
	"Security and Privacy in Healthcare",
	"Signal and Image Processing",
	"Social and Behavioral Studies",
	"Social Sciences",
	"Software Engineering",
	"Sound Design",
	"Spanish",
	"Spanish International",
	"Sports and Fitness Management",
	"Statistics",
	"Structural Engineering: Advanced Analysis",
	"Structural Engineering: Bridge Analysis and Design",
	"Structural Engineering: Building Design",
	"Structural Engineering: Hazard Analysis",
	"Structural Engineering: Timber Building Design",
	"Structural Materials",
	"Surveying",
	"Sustainability",
	"Sustainability Science and Society",
	"Sustainable Biomaterials",
	"Sustainable Bioproducts",
	"Sustainable Pavement Design and Construction",
	"Sustainable Water Resources Systems",
	"Systems Engineering",
	"Technical Theater",
	"Theatre and Electronic Media Performance",
	"Theatre and Entertainment Technology",
	"Theatre Arts",
	"Tissue and Stem Cell Engineering",
	"Vehicle Dynamics",
	"VISTA/AmeriCorps Programs",
	"Water Resources Modeling",
	"Water, Sanitation, and Hygiene (WASH) Engineering",
	"Wildlife Ecology and Conservation",
	"Writing",
];

export default function EditProfile() {
	useAuthenticatedRoute();
	const context = useContext(AppContext);
	const {user, loading: userLoading} = useDefaultAuthState();
	const {profile, loading: profileLoading, updateProfile} = useProfile();

	/* States */
	const [year, setYear] = useState(1);
	const [major, setMajor] = useState("");
	const [bio, setBio] = useState("");

	const [splitSecond, setSplitSecond] = useState(true);
	useTimeout(() => setSplitSecond(false), 500);


	useEffect(() => {
		setMajor(profile?.major ?? "");
		setBio(profile?.bio ?? "");
		setYear(profile?.year ?? 1);

	}, [profile])

	if (userLoading || profileLoading) {
		if (splitSecond) {
			return <Navigation />
		} else {
			return <>
				<Navigation/>
				<Container sx={{
					marginTop: "2em"
				}}>
					<Stack spacing={2} sx={{width: 500, margin: "auto"}}>
						<Typography variant={"h4"}>Edit your profile</Typography>
						<Skeleton variant={"rectangular"} sx={{height: 56}} />
						<Skeleton variant={"rectangular"} sx={{height: 56}} />
						<Skeleton variant={"rectangular"} sx={{height: 56}} />
						<Box sx={{display: "flex", justifyContent: "space-between"}}>
							<Button color={"secondary"} variant="outlined" startIcon={<Cancel/>}
							        onClick={() => Router.push(`/profile/${getTechUsername(user as User)}`)}>
								Cancel
							</Button>
							<Button variant="contained" endIcon={<Save/>}>
								Save Profile
							</Button>
						</Box>
					</Stack>
				</Container>
			</>
		}
	} else {
		return <>
			<Navigation/>
			<Container sx={{
				marginTop: "2em"
			}}>
				<Stack spacing={2} sx={{width: 500, margin: "auto"}}>
					<Box>
						<Typography variant={"h4"}>Edit your profile</Typography>
						<Typography variant={"body2"} color={"darkgrey"}>Please be responsible with your profile details.</Typography>
					</Box>
					<Autocomplete
						value={major}
						options={majors}
						freeSolo
						selectOnFocus
						clearOnBlur
						handleHomeEndKeys
						renderInput={(params) => {
							// @ts-ignore
							return <TextField {...params} variant={"outlined"} label="Major"/>;
						}}
						onInputChange={(event,value) => {
							setMajor(value);
						}}
					/>
					<TextField value={bio} multiline sx={{width: "100%"}} label={"A short bio about yourself"} onChange={(event) => {
						setBio(event.target.value)
					}}/>
					<Box>
						<Typography>Year: {year}<sup>{ordinal(year)}</sup></Typography>
						<Slider
							value={year}
							valueLabelDisplay="off"
							step={1}
							marks
							min={1}
							max={10}
							onChange={(event, value) => {
								setYear(value as number)
							}}
						/>
					</Box>
					<Box sx={{display: "flex", justifyContent: "space-between"}}>
						<Button color={"secondary"} variant="outlined" startIcon={<Cancel/>}
						        onClick={() => Router.push(`/profile/${getTechUsername(user as User)}`)}>
							Cancel
						</Button>
						<Button variant="contained" endIcon={<Save/>} onClick={() => {
							updateProfile({bio, year, major});
							context.showSnackbar  = true;
							Router.push({
								pathname: `/profile/${getTechUsername(user!)}`,
							})
						}}>
							Save Profile
						</Button>
					</Box>
				</Stack>

			</Container>
		</>

	}
}
