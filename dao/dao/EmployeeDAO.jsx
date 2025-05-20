import { collection, doc, setDoc, getDocs, query, where, updateDoc } from 'firebase/firestore';

import { db } from './firebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function EmployeeDAO() {
    const storage = getStorage();

    async function saveEmployee(employee) {
        try {
            // Check if there's a letter to upload
            if (employee.getLetter() instanceof File) {
                // Subimos la carta usando employeeId como nombre
                const storageRef = ref(storage, `letters/hiring/${employee.getId()}`);
                await uploadBytes(storageRef, employee.getLetter());
                const downloadURL = await getDownloadURL(storageRef);

                // Update employee with the download URL
                employee.setLetter(downloadURL);
            }

            // Check if there's a profile picture to upload
            if (employee.getProfilePicture() instanceof File) {
                const storageRef = ref(storage, `profilePictures/${employee.getProfilePicture().name}`);
                await uploadBytes(storageRef, employee.getProfilePicture());
                const downloadURL = await getDownloadURL(storageRef);
                employee.setProfilePicture(downloadURL);
            }

            // Save employee details to Firestore with a custom document ID (identification)
            const employeeDocRef = doc(collection(db, 'employees'), employee.getId()); // <- usar identification como ID
            await setDoc(employeeDocRef, {
                firstName: employee.getFirstName(),
                lastName: employee.getLastName(),
                email: employee.getEmail(),
                mobile: employee.getMobile(),
                address: employee.getAddress(),
                role: employee.getRole(),
                profilePicture: employee.getProfilePicture(), // Already a download URL if uploaded
                hireDate: employee.getHireDate(),
                status: employee.getStatus(),
            });

            console.log('Saved employee with custom ID:', employee.getId());
            // alert('The employee was successfully saved');
            return true;
        } catch (error) {
            console.error('Error saving employee:', error);
            return false;
        }
    }

    async function getAllEmployees() {
        try {
            const employeeCollectionRef = collection(db, 'employees');
            const querySnapshot = await getDocs(employeeCollectionRef);
            const employees = querySnapshot.docs.map(doc => ({
                identification: doc.id,
                ...doc.data()
            }));
            return employees;
        } catch (error) {
            console.error('Error fetching employees:', error);
            return [];
        }
    }

    async function getEmployeesByStatus(status) {
        try {
            const employeeCollectionRef = collection(db, 'employees');
            const employeeStatusQuery = query(employeeCollectionRef, where('status', '==', status));
            const employeeStatusSnapshot = await getDocs(employeeStatusQuery);

            const employees = employeeStatusSnapshot.docs.map(employeeDocument => ({
                identification: employeeDocument.id,
                ...employeeDocument.data()
            }));

            return employees;
        } catch (error) {
            console.error('Error fetching employees by status:', error);
            return [];
        }
    }

    async function getEmployeeByIdentification(id) {
        try {
            const employeeDocumentReference = doc(db, 'employees', id);
            const employeeDocumentSnapshot = await getDoc(employeeDocumentReference);

            if (employeeDocumentSnapshot.exists()) {
                return {
                    identification: employeeDocumentSnapshot.id,
                    ...employeeDocumentSnapshot.data()
                };
            } else {
                console.warn('No employee found with the provided id.');
                return null;
            }
        } catch (error) {
            console.error('Error fetching employee by id:', error);
            return null;
        }
    }

    async function updateEmployeeStatusById(employeeId, newStatus) {
        try {
            // Obtén una referencia al documento del empleado en Firestore
            const employeeRef = doc(db, 'employees', employeeId);

            // Actualiza el campo "status" del empleado
            await updateDoc(employeeRef, {
                status: newStatus
            });

            console.log(`Empleado con ID ${employeeId} actualizado exitosamente.`);
            return true;
        } catch (error) {
            console.error(`Error actualizando el status del empleado con ID ${employeeId}:`, error);
            return false;
        }
    }

    return {
        saveEmployee,
        getAllEmployees,
        getEmployeesByStatus,
        getEmployeeByIdentification,
        updateEmployeeStatusById
    };
}
