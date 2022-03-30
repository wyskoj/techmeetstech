import {
    collection,
    deleteDoc,
    doc,
    getFirestore,
    setDoc,
} from 'firebase/firestore';
import {useAuthenticatedCollectionData, useDefaultAuthState} from "./firebase";
import {Interest} from "../../types/interest";

export function useInterests() {
    const {user} = useDefaultAuthState();
    const interests = useAuthenticatedCollectionData<Interest>((user) => collection(getFirestore(), 'users', user.uid, 'interests'))[0] ?? null;

    function updateInterest(value: String | null) {
        if (user) {
            if (value) {
                setDoc(doc(getFirestore(), `/users/${user.uid}/interests/${value}`), {
                    value,
                });
            } else {
                deleteDoc(
                    doc(getFirestore(), `/users/${user.uid}/pixels/${value}`)
                );
            }
        }
    }

    return {interests, updateInterest};
}
