import { User } from 'firebase/auth';

/**
 * Given a user's Firebase credentials, determines their MTech username
 * @param user the firebase user
 */
export function getTechUsername(user: User): string | null {
	const email = user.email;
	if (email) {
		return email?.split('@')[0];
	} else {
		return null;
	}
}
