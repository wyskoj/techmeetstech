import { useAuthenticatedDocumentData } from './firebase';
import { Profile } from '../../types/profile';
import { doc, getFirestore, setDoc } from 'firebase/firestore';

export function useProfile(uid: string) {
	const [profile, loading] = useAuthenticatedDocumentData<Profile>(() =>
		doc(getFirestore(), 'users', uid)
	);

	function updateProfile(profile: Profile) {
		setDoc(doc(getFirestore(), `/users/${uid}`), profile);
	}

	return { profile, loading, updateProfile };
}
