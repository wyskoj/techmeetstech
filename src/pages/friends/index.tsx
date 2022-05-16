import Navigation from '../../components/navigation';
import { useAuthenticatedRoute } from '../../utils/hooks/firebase';

export default function Friends() {
	useAuthenticatedRoute();
	return (
		<>
			<Navigation />
		</>
	);
}
