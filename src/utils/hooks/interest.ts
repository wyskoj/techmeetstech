import { useAuthenticatedDocumentData, useDefaultAuthState } from './firebase';
import { doc, getFirestore, setDoc } from 'firebase/firestore';

export function useInterests() {
	const { user } = useDefaultAuthState();
	const [interests, loading] = useAuthenticatedDocumentData<{
		interests: string[];
	}>((user) => doc(getFirestore(), 'interests', user.uid));
	const interestArray = interests?.interests;

	function updateInterests(interests: string[]) {
		if (user) {
			setDoc(doc(getFirestore(), `/interests/${user.uid}`), { interests });
		}
	}

	return { interests: interestArray, loading, updateInterests };
}
