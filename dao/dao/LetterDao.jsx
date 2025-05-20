// src/dao/LetterDao.jsx
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';

export default function LetterDao() {
    async function getAllLetters() {
        try {
            const hiringRef = ref(storage, 'letters/hiring/');
            const dismissalRef = ref(storage, 'letters/termination/Dismissal/');
            const resignationRef = ref(storage, 'letters/termination/Resignation/');

            const [hiringResult, dismissalResult, resignationResult] = await Promise.all([
                listAll(hiringRef),
                listAll(dismissalRef),
                listAll(resignationRef),
            ]);

            const hiringFiles = await Promise.all(
                hiringResult.items.map(async (item) => ({
                    name: item.name,
                    path: item.fullPath,
                    url: await getDownloadURL(item),
                }))
            );

            const dismissalFiles = await Promise.all(
                dismissalResult.items.map(async (item) => ({
                    name: item.name,
                    path: item.fullPath,
                    url: await getDownloadURL(item),
                }))
            );

            const resignationFiles = await Promise.all(
                resignationResult.items.map(async (item) => ({
                    name: item.name,
                    path: item.fullPath,
                    url: await getDownloadURL(item),
                }))
            );

            return {
                hiring: hiringFiles,
                termination: {
                    dismissal: dismissalFiles,
                    resignation: resignationFiles,
                },
            };
        } catch (error) {
            console.error('Error fetching letters file structure:', error);
            throw new Error('Failed to retrieve file structure from Firebase Storage');
        }
    }

    return {
        getAllLetters,
    };
}