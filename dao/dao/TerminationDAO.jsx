import { collection, doc, setDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from './firebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function TerminationDAO() {
    const storage = getStorage();

    async function saveTermination(termination) {
        try {
            if (termination.getLetter() instanceof File) {
                // Subimos la carta usando employeeId como nombre
                const storageRef = ref(storage, `letters/termination/${termination.getType()}/${termination.getEmployeeId()}`);
                await uploadBytes(storageRef, termination.getLetter());
                const downloadURL = await getDownloadURL(storageRef);

                // Actualizamos termination con la URL de descarga
                termination.setLetter(downloadURL);
            }

            // Guardamos la terminación en Firestore
            const terminationDocRef = doc(collection(db, 'terminations'), termination.getEmployeeId());
            await setDoc(terminationDocRef, {
                employeeId: termination.getEmployeeId(),
                date: termination.getDate(),
                type: termination.getType(),
                reason: termination.getReason(),
                letter: termination.getLetter() || null
            });

            console.log('Saved termination with custom ID:', termination.getEmployeeId());
            // alert('The termination was successfully saved');
            return true;
        } catch (error) {
            console.error('Error saving termination:', error);
            return false;
        }
    }

    async function countTerminationsFromLastYear() {
        const terminationsRef = collection(db, 'terminations');
        const now = new Date();
        const oneYearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());

        const q = query(terminationsRef, where('date', '>=', oneYearAgo.toISOString()));
        const snapshot = await getDocs(q);

        const monthlyCount = {};

        snapshot.forEach(doc => {
            const data = doc.data();
            if (data.date) {
                const date = new Date(data.date);
                const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
                monthlyCount[monthKey] = (monthlyCount[monthKey] || 0) + 1;
            }
        });

        // Convert to array of { month: 'YYYY-MM', count: number }
        return Object.entries(monthlyCount)
            .map(([month, count]) => ({ month, count }))
            .sort((a, b) => a.month.localeCompare(b.month));
    }

    return {
        saveTermination,
        countTerminationsFromLastYear
    };
}
