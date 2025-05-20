import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, ActivityIndicator } from 'react-native';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OneLineInput from '../../src/OneLineInput';
import Employee from '../model/Employee';
import EmployeeRule from '../rule/EmployeeRule';

export default function SignUpForm({ onBack }) {
    const [employee] = useState(new Employee());
    const [employeeRule] = useState(new EmployeeRule());
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

    const handleResult = async (value) => {
        if (step === 1 && checkInput(value, 'id')) {
            employee.setId(value);
            setStep(prev => prev + 1);
        } else if (step === 2 && checkInput(value, 'name')) {
            employee.setFirstName(value);
            setStep(prev => prev + 1);
        } else if (step === 3 && checkInput(value, 'name')) {
            employee.setLastName(value);
            setStep(prev => prev + 1);
        } else if (step === 4 && checkInput(value, 'email')) {
            employee.setEmail(value);
            setStep(prev => prev + 1);
        } else if (step === 5 && checkInput(value, 'mobile')) {
            employee.setMobile(value);
            setStep(prev => prev + 1);
        } else if (step === 6 && checkInput(value, 'address')) {
            employee.setAddress(value);
            setStep(prev => prev + 1);
        } else if (step === 7 && checkInput(value, 'role')) {
            employee.setRole(value);
            setStep(prev => prev + 1);
        } else if (step === 8) {
            setLoading(true); // Activar loader al subir la foto
            employee.setProfilePicture(value);
            setStep(prev => prev + 1);
            setLoading(false); // Desactivar loader después de setear
        } else if (step === 9) {
            setLoading(true); // Activar loader antes de guardar
            employee.setLetter(value);
            employee.setHireDate();
            employee.setStatus(true);

            try {
                const success = await employeeRule.saveEmployee(employee);
                if (success) {
                    toast.success('¡Empleado guardado exitosamente!', {
                        position: 'top-right',
                        autoClose: 3000,
                    });
                    onBack(); // Regresar a Home tras éxito
                } else {
                    toast.error('No se pudo guardar el empleado.', {
                        position: 'top-right',
                        autoClose: 3000,
                    });
                }
            } catch (error) {
                console.log('Error al guardar empleado:', error);
                toast.error('Error al guardar el empleado.', {
                    position: 'top-right',
                    autoClose: 3000,
                });
            } finally {
                setLoading(false); // Desactivar loader después de guardar
            }
        } else {
            toast.error(`Entrada inválida para ${getFieldName(step)}`, {
                position: 'top-right',
                autoClose: 3000,
            });
        }
    };

    const checkInput = (value, type) => {
        return employeeRule.checkInputByType(value, type);
    };

    const getFieldName = (step) => {
        switch (step) {
            case 1: return 'identificación';
            case 2: return 'nombre';
            case 3: return 'apellido';
            case 4: return 'email';
            case 5: return 'teléfono';
            case 6: return 'dirección';
            case 7: return 'cargo';
            case 8: return 'foto de perfil';
            case 9: return 'carta de contratación';
            default: return 'campo';
        }
    };

    return (
        <>
            {loading && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color="#00ff00" />
                </View>
            )}
            <View style={styles.container}>
                <TouchableOpacity style={styles.backButton} onPress={onBack}>
                    <Text style={styles.backButtonText}>Volver</Text>
                </TouchableOpacity>

                {step === 1 && (
                    <View style={styles.inputWrapper}>
                        <OneLineInput onPlaceholder="Enter Identification" onType="text" onResult={handleResult} />
                    </View>
                )}
                {step === 2 && (
                    <View style={styles.inputWrapper}>
                        <OneLineInput onPlaceholder="Enter First Name" onType="text" onResult={handleResult} />
                    </View>
                )}
                {step === 3 && (
                    <View style={styles.inputWrapper}>
                        <OneLineInput onPlaceholder="Enter Last Name" onType="text" onResult={handleResult} />
                    </View>
                )}
                {step === 4 && (
                    <View style={styles.inputWrapper}>
                        <OneLineInput onPlaceholder="Enter Email" onType="email" onResult={handleResult} />
                    </View>
                )}
                {step === 5 && (
                    <View style={styles.inputWrapper}>
                        <OneLineInput onPlaceholder="Enter Phone" onType="tel" onResult={handleResult} />
                    </View>
                )}
                {step === 6 && (
                    <View style={styles.inputWrapper}>
                        <OneLineInput onPlaceholder="Enter Address" onType="text" onResult={handleResult} />
                    </View>
                )}
                {step === 7 && (
                    <View style={styles.inputWrapper}>
                        <OneLineInput onPlaceholder="Enter Job Title" onType="text" onResult={handleResult} />
                    </View>
                )}
                {step === 8 && (
                    <View style={styles.inputWrapper}>
                        <OneLineInput onPlaceholder="Upload Profile Picture" isFile={true} onResult={handleResult} />
                    </View>
                )}
                {step === 9 && (
                    <View style={styles.inputWrapper}>
                        <OneLineInput onPlaceholder="Upload Hiring Letter" isFile={true} allowDocuments={true} onResult={handleResult} />
                    </View>
                )}
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        width: '100%',
        maxWidth: 900,
        alignSelf: 'center',
        backgroundColor: '#f9f9f9',
        justifyContent: 'center',
    },
    inputWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    backButton: {
        position: 'absolute',
        top: 24,
        left: 24,
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        zIndex: 1,
    },
    backButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    loadingOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semitransparente
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
});