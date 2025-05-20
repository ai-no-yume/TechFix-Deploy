import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform, ActivityIndicator, ScrollView } from 'react-native';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OneLineInput from '../../src/OneLineInput'; // Ajusta la ruta
import Administrator from '../model/Administrator';
import AdministratorRule from '../rule/AdministratorRule';

export default function SignInForm({ onLoginSuccess }) {
    const [administrator] = useState(new Administrator());
    const [administratorRule] = useState(new AdministratorRule());
    const [step, setStep] = useState(1);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleResult = async (value) => {
        if (step === 1 && checkInput(value, 'email')) {
            administrator.setEmail(value);
            setStep(prev => prev + 1);
        } else if (step === 2 && checkInput(value, 'password')) {
            administrator.setPassword(value);

            try {
                setLoading(true); // Activar loading antes de la validación
                const isValid = await administratorRule.checkCredentials(administrator);

                if (isValid) {
                    toast.success('¡Inicio de sesión exitoso!', {
                        position: 'top-right',
                        autoClose: 3000,
                    });
                    onLoginSuccess();
                } else {
                    toast.error('Credenciales inválidas', {
                        position: 'top-right',
                        autoClose: 3000,
                    });
                    setStep(1);
                }
            } catch (error) {
                console.log('Error en checkCredentials:', error);
                toast.error('Error al verificar las credenciales', {
                    position: 'top-right',
                    autoClose: 3000,
                });
                setStep(1);
            } finally {
                setLoading(false); // Desactivar loading después de la validación
            }
        } else {
            toast.error(`Entrada inválida para ${step === 1 ? 'email' : 'contraseña'}`, {
                position: 'top-right',
                autoClose: 3000,
            });
        }
    };

    const checkInput = (value, type) => {
        return administratorRule.checkInputByType(value, type);
    };

    return (
        <>
            {loading ? (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color="#00ff00" />
                </View>
            ) : (
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View>
                        <Text style={styles.welcomeText}>Sign You</Text>
                        {step === 1 && <OneLineInput onPlaceholder="Type Email" onType="text" onResult={handleResult} />}
                        {step === 2 && <OneLineInput onPlaceholder="Type Password" onType="password" onResult={handleResult} />}
                        {error && <Text style={styles.errorText}>{error}</Text>}
                    </View>
                </ScrollView>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: Platform.OS === 'web' ? 20 : 15,
    },
    loadingOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semitransparente para cubrir el contenido
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        marginTop: 10,
        textAlign: Platform.OS === 'web' ? 'left' : 'center',
    },
    welcomeText: {
        fontSize: 28,
        fontWeight: 'semibold', // Texto en negrita
        color: '#605a5a', // Color oscuro para contraste
        textAlign: 'center',
        marginBottom: 20,
    },
});
