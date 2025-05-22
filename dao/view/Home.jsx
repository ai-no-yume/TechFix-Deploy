import React, { useState } from 'react';
import { StyleSheet, Platform, View, Text } from 'react-native';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OneLineInput from '../../src/OneLineInput';
import Help from './Help';
import SignUpForm from './SignUpForm';
import EmployeeTable from './EmployeeTable';
import TerminationGraph from './TerminationGraph';
import Letters from './Letters';

export default function Home() {
    const [currentComponent, setCurrentComponent] = useState(null);

    const commandInterpreter = (input) => {
        const normalizedInput = input.toLowerCase().trim();
        const intentions = {
            register: [/.*\bregister\b.*/, /.*\bsign up\b.*/, /.*\badd\b.*/, /.*\bnew\b.*/, /.*\bregistrar\b.*/, /.*\bingresar\b.*/, /.*\bagregar\b.*/, /.*\bnuevo\b.*/, /.*\binscribir\b.*/, /.*\bincorporar\b.*/],
            allEmployees: [/.*\ball employees\b.*/, /.*\btodos los empleados\b.*/, /.*\btodo el personal\b.*/],
            activeEmployees: [/.*\bactive employees\b.*/, /.*\bempleados activos\b.*/, /.*\bpersonal activo\b.*/],
            inactiveEmployees: [/.*\binactive employees\b.*/, /.*\bempleados inactivos\b.*/, /.*\bpersonal inactivo\b.*/],
            help: [/.*\bhelp\b.*/, /.*\bhelp me\b.*/, /.*\bneed help\b.*/, /.*-h.*/, /.*--h.*/, /.*-help.*/, /.*--help.*/, /.*\bguide\b.*/, /.*\binstructions\b.*/, /.*\bayuda\b.*/, /.*\bayudame\b.*/, /.*\bnecesito ayuda\b.*/, /.*\bguia\b.*/, /.*\bmanual\b.*/, /.*\binstrucciones\b.*/],
            termination: [/.*\btermination chart\b.*/, /.*\btermination summary\b.*/, /.*\bgrafico de terminaciones\b.*/, /.*\bgrafico de despidos\b.*/, /.*\bgrafico de bajas\b.*/, /.*\bresumen de terminaciones\b.*/, /.*\bresumen de despidos\b.*/, /.*\bresumen de bajas\b.*/],
            allLetters: [/.*\ball letters\b.*/, /.*\ball documents\b.*/, /.*\ball files\b.*/, /.*\btodas las cartas\b.*/, /.*\btodos los documentos\b.*/, /.*\btodos los archivos\b.*/],
            hiringLetters: [/.*\bhiring letters\b.*/, /.*\bhiring documents\b.*/, /.*\bhiring files\b.*/, /.*\bcartas de contratacion\b.*/, /.*\bdocumentos de contratacion\b.*/, /.*\barchivos de contratacion\b.*/],
            dismissalLetters: [/.*\bdismissal letters\b.*/, /.*\bdismissal documents\b.*/, /.*\bdismissal files\b.*/, /.*\bcartas de despido\b.*/, /.*\bdocumentos de despido\b.*/, /.*\barchivos de despido\b.*/],
            resignationLetters: [/.*\bresignation letters\b.*/, /.*\bresignation documents\b.*/, /.*\bresignation files\b.*/, /.*\bcartas de renuncia\b.*/, /.*\bdocumentos de renuncia\b.*/, /.*\barchivos de renuncia\b.*/]
        };

        if (intentions.register.some(regex => regex.test(normalizedInput))) return 1;
        if (intentions.allEmployees.some(regex => regex.test(normalizedInput))) return 2;
        if (intentions.activeEmployees.some(regex => regex.test(normalizedInput))) return 3;
        if (intentions.inactiveEmployees.some(regex => regex.test(normalizedInput))) return 4;
        if (intentions.help.some(regex => regex.test(normalizedInput))) return 5;
        if (intentions.termination.some(regex => regex.test(normalizedInput))) return 6;
        if (intentions.allLetters.some(regex => regex.test(normalizedInput))) return 7;
        if (intentions.hiringLetters.some(regex => regex.test(normalizedInput))) return 8;
        if (intentions.dismissalLetters.some(regex => regex.test(normalizedInput))) return 9;
        if (intentions.resignationLetters.some(regex => regex.test(normalizedInput))) return 10;

        return null;
    };

    const goBack = () => setCurrentComponent(null);

    const handleResult = (value) => {
        const normalized = value.trim();
        const result = commandInterpreter(normalized);

        switch (result) {
            case 1:
                setCurrentComponent(<SignUpForm onBack={goBack} />);
                break;
            case 2:
                setCurrentComponent(<EmployeeTable onBack={goBack} initialStatusFilter="All" />);
                break;
            case 3:
                setCurrentComponent(<EmployeeTable onBack={goBack} initialStatusFilter={true} />);
                break;
            case 4:
                setCurrentComponent(<EmployeeTable onBack={goBack} initialStatusFilter={false} />);
                break;
            case 5:
                setCurrentComponent(<Help onBack={goBack} />);
                break;
            case 6:
                setCurrentComponent(<TerminationGraph onBack={goBack} />);
                break;
            case 7:
                setCurrentComponent(<Letters onBack={goBack} initialStatusFilter="All" />);
                break;
            case 8:
                setCurrentComponent(<Letters onBack={goBack} initialStatusFilter="Hiring" />);
                break;
            case 9:
                setCurrentComponent(<Letters onBack={goBack} initialStatusFilter="Dismissal" />);
                break;
            case 10:
                setCurrentComponent(<Letters onBack={goBack} initialStatusFilter="Resignation" />);
                break;
            default:
                console.log(`${result} comando desconocido`);
                toast.error('Comando no reconocido. Intenta de nuevo o escribe "help".', {
                    position: 'top-right',
                    autoClose: 3000,
                });
                setCurrentComponent(null);
        }
    };

    return (
        <>
            {!currentComponent && (
                <View>
                    <OneLineInput
                        onPlaceholder="Type a command..."
                        onType="text"
                        onResult={handleResult}
                    />
                </View>
            )}
            {currentComponent}
        </>
    );
}