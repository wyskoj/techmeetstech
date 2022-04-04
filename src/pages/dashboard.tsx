import { useAuthenticatedRoute } from '../utils/hooks/firebase';
import Navigation from '../components/navigation';

export default function Dashboard() {
	useAuthenticatedRoute();
	return (
		<>
			<Navigation />
		</>
	);
}
