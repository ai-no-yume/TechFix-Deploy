import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OneLineInput from '../../src/OneLineInput';
import Termination from '../model/Termination';
import TerminationRule from '../rule/TerminationRule';

export default function TerminationForm({ employeeId, onSuccess }) {
    const [termination] = useState(new Termination());
    const [terminationRule] = useState(new TerminationRule());
    const [step, setStep] = useState(1);

    useEffect(() => {
        if (employeeId) {
            termination.setEmployeeId(employeeId);
        }
    }, [employeeId]);

    const handleResult = async (value) => {
        if (step === 1) {
            if (['Resignation', 'Dismissal'].includes(value)) {
                termination.setType(value);
                setStep(prev => prev + 1);
            } else {
                toast.error('Seleccione un tipo de terminación válido.', {
                    position: 'top-right',
                    autoClose: 3000,
                });
            }
        } else if (step === 2 && checkInput(value, 'text')) {
            termination.setReason(value);
            setStep(prev => prev + 1);
        } else if (step === 3) {
            termination.setLetter(value);
            termination.setDate();

            try {
                const success = await terminationRule.saveTermination(termination);
                if (success) {
                    // toast.success('¡Terminación guardada exitosamente!', {
                    //     position: 'top-right',
                    //     autoClose: 3000,
                    // });
                    onSuccess(); // Llamar al callback para cerrar el modal y recargar
                } else {
                    toast.error('No se pudo guardar la terminación.', {
                        position: 'top-right',
                        autoClose: 3000,
                    });
                }
            } catch (error) {
                console.log('Error al guardar terminación:', error);
                toast.error('Error al guardar la terminación.', {
                    position: 'top-right',
                    autoClose: 3000,
                });
            }
        } else {
            toast.error(`Entrada inválida para ${getFieldName(step)}`, {
                position: 'top-right',
                autoClose: 3000,
            });
        }
    };

    const checkInput = (value, type) => {
        return terminationRule.checkInputByType(value, type);
    };

    const getFieldName = (step) => {
        switch (step) {
            case 1: return 'tipo de terminación';
            case 2: return 'motivo';
            case 3: return 'carta de terminación';
            default: return 'campo';
        }
    };

    return (
        <View style={styles.container}>
            {step === 1 && (
                <OneLineInput
                    onPlaceholder="Select Termination Type"
                    isSelect={true}
                    options={['Resignation', 'Dismissal']}
                    onResult={handleResult}
                />
            )}
            {step === 2 && (
                <OneLineInput
                    onPlaceholder="Enter Termination Reason"
                    onType="text"
                    onResult={handleResult}
                />
            )}
            {step === 3 && (
                <OneLineInput
                    onPlaceholder="Upload Termination Letter"
                    isFile={true}
                    allowDocuments={true}
                    onResult={handleResult}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: Platform.OS === 'web' ? 500 : '100%',
        padding: Platform.OS === 'web' ? 20 : 15,
        backgroundColor: '#fff',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        alignSelf: 'center',
    },
});