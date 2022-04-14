import { useAuthenticatedDocumentData } from './firebase';
import { doc, getFirestore, setDoc } from 'firebase/firestore';

export function useInterests(uid: string) {
	const [interests, loading] = useAuthenticatedDocumentData<{
		interests: string[];
	}>(() => doc(getFirestore(), 'interests', uid));
	const interestArray = interests?.interests;

	function updateInterests(interests: string[]) {
		setDoc(doc(getFirestore(), `/interests/${uid}`), { interests });
	}

	return { interests: interestArray, loading, updateInterests };
}
