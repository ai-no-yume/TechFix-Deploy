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
            register: [/^register$/, /^sign up$/, /^add$/, /^new$/, /^registrar$/, /^ingresar$/, /^agregar$/, /^nuevo$/, /^inscribir$/, /^incorporar$/],
            allEmployees: [/^all employees$/, /^todos los empleados$/, /^todo el personal$/],
            activeEmployees: [/^active employees$/, /^show active employees$/, /^empleados activos$/, /^personal activo$/],
            inactiveEmployees: [/^inactive employees$/, /^show inactive employees$/, /^empleados inactivos$/, /^personal inactivo$/],
            help: [/^help$/, /^help me$/, /^need help$/, /^-h$/, /^--h$/, /^-help$/, /^--help$/, /^guide$/, /^instructions$/, /^ayuda$/, /^ayudame$/, /^necesito ayuda$/, /^guia$/, /^manual$/, /^instrucciones$/],
            termination: [/^termination chart$/, /^termination summary$/, /^grafico de terminaciones$/, /^grafico de despidos$/, /^grafico de bajas$/, /^resumen de terminaciones$/, /^resumen de despidos$/, /^resumen de bajas$/],
            allLetters: [/^all letters$/, /^all documents$/, /^all files$/, /^todas las cartas$/, /^todos los documentos$/, /^todos los archivo$/],
            hiringLetters: [/^hiring letters$/, /^hiring documents$/, /^hiring files$/, /^cartas de contratacion$/, /^documentos de contratacion$/, /^archivos de contratacion$/],
            dismissalLetters: [/^dismissal letters$/, /^dismissal documents$/, /^dismissal files$/, /^cartas de despido$/, /^documentos de despido$/, /^archivos de despido$/],
            resignationLetters: [/^resignation letters$/, /^resignation documents$/, /^resignation files$/, /^cartas de renuncia$/, /^documentos de renuncia$/, /^archivos de renuncia$/]
        };

        if (intentions.register.some(regex => regex.test(normalizedInput))) return 1;
        if (intentions.allEmployees.some(regex => regex.test(normalizedInput))) return 2;
        if (intentions.activeEmployees.some(regex => regex.test(normalizedInput))) {
            console.log('Matched: activeEmployees');
            return 3;
        }
        if (intentions.inactiveEmployees.some(regex => regex.test(normalizedInput))) {
            console.log('Matched: inactiveEmployees');
            return 4;
        }
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