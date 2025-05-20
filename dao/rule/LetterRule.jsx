// src/services/LetterRule.js
import LetterDao from '../dao/LetterDao';

export default function LetterRule() {
    const letterDao = LetterDao();
    let fileStructure = {
        hiring: [],
        termination: { dismissal: [], resignation: [] },
    };

    async function getAllLetters() {
        try {
            const structure = await letterDao.getAllLetters();
            fileStructure = structure; // Actualizamos directamente
            return structure;
        } catch (error) {
            console.error('LetterRule: Error fetching letters:', error);
            throw new Error('Failed to load letters. Please try again.');
        }
    }

    function getFilesByFolder(folder) {
        if (!fileStructure.hiring.length && !fileStructure.termination.dismissal.length && !fileStructure.termination.resignation.length) {
            return [];
        }
        if (folder === 'hiring') {
            return fileStructure.hiring;
        } else if (folder === 'termination.dismissal') {
            return fileStructure.termination.dismissal;
        } else if (folder === 'termination.resignation') {
            return fileStructure.termination.resignation;
        }
        return [];
    }

    return {
        getAllLetters,
        getFilesByFolder,
    };
}