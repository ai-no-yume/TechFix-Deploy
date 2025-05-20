import AdministratorDAO from "../dao/AdministratorDAO";
import {useState} from "react";

export default function AdministratorRule() {
    const [administratorDAO] = useState(new AdministratorDAO());

    const checkInputByType = (value, type) => {
        let regex;

        if (type === 'email') {
            regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        } else if (type === 'password') {
            regex = /^[A-Za-z-]+$/;
        }

        return regex.test(value);
    };

    const checkCredentials = async (administrator) => {
        console.log('Verifying administrator credentials:', administrator);
        return await administratorDAO.checkCredentials(administrator);
    };

    return {
        checkInputByType,
        checkCredentials
    };
}