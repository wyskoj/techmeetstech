import { useAuthenticatedRoute, useDefaultAuthState } from "../utils/hooks/firebase";
import Navigation from "../components/navigation";

export default function Dashboard() {
	useAuthenticatedRoute();
	const {user} = useDefaultAuthState();

	return <>
		<Navigation name={user?.displayName ?? ""}/>
	</>
}
