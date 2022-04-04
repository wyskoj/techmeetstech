import { useAuthenticatedDocumentData, useDefaultAuthState } from './firebase';
import { Profile } from '../../types/profile';
import { doc, getFirestore, setDoc } from 'firebase/firestore';

export function useProfile() {
	const { user } = useDefaultAuthState();
	const [profile, loading] = useAuthenticatedDocumentData<Profile>((user) =>
		doc(getFirestore(), 'users', user.uid)
	);

	function updateProfile(profile: Profile) {
		if (user) {
			setDoc(doc(getFirestore(), `/users/${user.uid}`), profile);
		}
	}

	return { profile, loading, updateProfile };
}
