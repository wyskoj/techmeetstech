import Navigation from '../../components/navigation';
import { useAuthenticatedRoute } from '../../utils/hooks/firebase';

export default function Events() {
	useAuthenticatedRoute();
	return (
		<>
			<Navigation />
		</>
	);
}
