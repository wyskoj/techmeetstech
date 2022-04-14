import { useAuthenticatedDocumentData } from './firebase';
import { doc, getFirestore } from 'firebase/firestore';
import { Account } from '../../types/account';

export function useAccount(uid: string) {
	const [account, loading] = useAuthenticatedDocumentData<Account>(() =>
		doc(getFirestore(), 'accounts', uid)
	);

	return { account, loading };
}
