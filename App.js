import React, { useState } from 'react';
import { StatusBar, View, StyleSheet } from 'react-native';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignInForm from './dao/view/SignInForm';
import Home from './dao/view/Home';

export default function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <View style={styles.wrapper}>
            {isAuthenticated ? (
                <Home />
            ) : (
                <SignInForm onLoginSuccess={() => setIsAuthenticated(true)} />
            )}
            <ToastContainer />
            <StatusBar style="light" />
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        justifyContent: 'center',
        alignItems: 'center',
    },
});