import Navigation from '../../components/navigation';
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Container,
	Stack,
	Typography,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import React from 'react';

export default function Communities() {
	const [expanded, setExpanded] = React.useState<string | false>(false);

	const handleChange =
		(panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
			setExpanded(isExpanded ? panel : false);
		};

	return (
		<>
			<Navigation />
			<Container sx={{ marginTop: '1em' }}>
				<Stack spacing={2}>
					<Stack>
						<Typography variant={'h4'}>Your communities</Typography>
						<Typography variant={'body1'}>
							Here&apos;s all the communities you&apos;ve joined.
						</Typography>
					</Stack>
					<Stack>
						<Accordion
							expanded={expanded === 'panel1'}
							onChange={handleChange('panel1')}
						>
							<AccordionSummary
								expandIcon={<ExpandMore />}
								aria-controls="panel1bh-content"
								id="panel1bh-header"
							>
								<Typography sx={{ width: '33%', flexShrink: 0 }}>
									General settings
								</Typography>
								<Typography sx={{ color: 'text.secondary' }}>
									I am an accordion
								</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<Typography>
									Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
									feugiat. Aliquam eget maximus est, id dignissim quam.
								</Typography>
							</AccordionDetails>
						</Accordion>
						<Accordion
							expanded={expanded === 'panel2'}
							onChange={handleChange('panel2')}
						>
							<AccordionSummary
								expandIcon={<ExpandMore />}
								aria-controls="panel2bh-content"
								id="panel2bh-header"
							>
								<Typography sx={{ width: '33%', flexShrink: 0 }}>
									Users
								</Typography>
								<Typography sx={{ color: 'text.secondary' }}>
									You are currently not an owner
								</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<Typography>
									Donec placerat, lectus sed mattis semper, neque lectus feugiat
									lectus, varius pulvinar diam eros in elit. Pellentesque
									convallis laoreet laoreet.
								</Typography>
							</AccordionDetails>
						</Accordion>
						<Accordion
							expanded={expanded === 'panel3'}
							onChange={handleChange('panel3')}
						>
							<AccordionSummary
								expandIcon={<ExpandMore />}
								aria-controls="panel3bh-content"
								id="panel3bh-header"
							>
								<Typography sx={{ width: '33%', flexShrink: 0 }}>
									Advanced settings
								</Typography>
								<Typography sx={{ color: 'text.secondary' }}>
									Filtering has been entirely disabled for whole web server
								</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<Typography>
									Nunc vitae orci ultricies, auctor nunc in, volutpat nisl.
									Integer sit amet egestas eros, vitae egestas augue. Duis vel
									est augue.
								</Typography>
							</AccordionDetails>
						</Accordion>
						<Accordion
							expanded={expanded === 'panel4'}
							onChange={handleChange('panel4')}
						>
							<AccordionSummary
								expandIcon={<ExpandMore />}
								aria-controls="panel4bh-content"
								id="panel4bh-header"
							>
								<Typography sx={{ width: '33%', flexShrink: 0 }}>
									Personal data
								</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<Typography>
									Nunc vitae orci ultricies, auctor nunc in, volutpat nisl.
									Integer sit amet egestas eros, vitae egestas augue. Duis vel
									est augue.
								</Typography>
							</AccordionDetails>
						</Accordion>
					</Stack>
				</Stack>
			</Container>
		</>
	);
}
