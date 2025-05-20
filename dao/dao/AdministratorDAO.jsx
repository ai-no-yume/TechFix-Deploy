import { collection, doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

export default function AdministratorDAO() {
    async function checkCredentials(administrator) {
        try {
            const adminDocRef = doc(collection(db, 'administrators'), administrator.getEmail());
            const adminDocSnapshot = await getDoc(adminDocRef);

            if (adminDocSnapshot.exists()) {
                const adminData = adminDocSnapshot.data();

                // Comparar las contraseñas
                if (adminData.password === administrator.getPassword()) {
                    console.log('Administrator credentials verified.');
                    return true;
                } else {
                    console.warn('Incorrect password.');
                    return false;
                }
            } else {
                console.warn('Administrator not found.');
                return false;
            }
        } catch (error) {
            console.error('Error verifying administrator credentials:', error);
            return false;
        }
    }

    return {
        checkCredentials
    };
}
