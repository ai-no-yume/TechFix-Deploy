import TerminationDAO from "../dao/TerminationDAO";
import EmployeeRule from "../rule/EmployeeRule";

export default function TerminationRule() {
    const terminationDAO = TerminationDAO();
    const employeeRule = EmployeeRule();

    const checkInputByType = (value, type) => {
        let regex;

        if (type === 'text') {
            // Permitir letras, números, signos básicos de puntuación y espacios, mínimo 3 caracteres
            regex = /^[\w\s.,;:!?()'"-]{3,}$/i;
        }

        return regex ? regex.test(value) : false;
    };

    async function saveTermination(termination) {
        console.log('Sending to DAO the termination:', termination);
        await employeeRule.unsubscribeEmployee(termination.employeeId);
        return await terminationDAO.saveTermination(termination);
    }

    async function countTerminationsFromLastYear() {
        return await terminationDAO.countTerminationsFromLastYear();
    }

    return {
        checkInputByType,
        saveTermination,
        countTerminationsFromLastYear
    };
}