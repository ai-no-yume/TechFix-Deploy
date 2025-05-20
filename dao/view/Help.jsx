// dao/view/Help.jsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import DataTable from '../../src/DataTable';

export default function Help({ onBack }) {
    const registrationCommands = [
        { english: 'register a new employee', spanish: 'registrar un nuevo empleado' },
        { english: 'register new employee', spanish: 'registrar nuevo empleado' },
        { english: 'register employee', spanish: 'registrar empleado' },
        { english: 'add a new employee', spanish: 'agregar un nuevo empleado' },
        { english: 'add new employee', spanish: 'agregar nuevo empleado' },
        { english: 'add employee', spanish: 'agregar empleado' },
        { english: 'sign up a new employee', spanish: 'inscribir un nuevo empleado' },
        { english: 'sign up new employee', spanish: 'inscribir nuevo empleado' },
        { english: 'sign up employee', spanish: 'inscribir empleado' },
        { english: 'new employee', spanish: 'nuevo empleado' },
    ];

    const allEmployeesCommands = [
        { english: 'show all employees', spanish: 'mostrar todos los empleados' },
        { english: 'show me all employees', spanish: 'mostrarme todos los empleados' },
        { english: 'show employees', spanish: 'mostrar empleados' },
        { english: 'view all employees', spanish: 'ver todos los empleados' },
        { english: 'view employees', spanish: 'ver empleados' },
        { english: 'visualize all employees', spanish: 'visualizar todos los empleados' },
        { english: 'visualize employees', spanish: 'visualizar empleados' },
        { english: 'list all employees', spanish: 'listar todos los empleados' },
    ];

    const activeEmployeesCommands = [
        { english: 'show me all active employees', spanish: 'mostrarme todos los empleados activos' },
        { english: 'show all active employees', spanish: 'mostrar todos los empleados activos' },
        { english: 'show me active employees', spanish: 'mostrarme empleados activos' },
        { english: 'show active employees', spanish: 'mostrar empleados activos' },
        { english: 'view all active employees', spanish: 'ver todos los empleados activos' },
        { english: 'view active employees', spanish: 'ver empleados activos' },
        { english: 'visualize all active employees', spanish: 'visualizar todos los empleados activos' },
        { english: 'visualize active employees', spanish: 'visualizar empleados activos' },
    ];

    const inactiveEmployeesCommands = [
        { english: 'show me all inactive employees', spanish: 'mostrarme todos los empleados inactivos' },
        { english: 'show all inactive employees', spanish: 'mostrar todos los empleados inactivos' },
        { english: 'show me inactive employees', spanish: 'mostrarme empleados inactivos' },
        { english: 'show inactive employees', spanish: 'mostrar empleados inactivos' },
        { english: 'view all inactive employees', spanish: 'ver todos los empleados inactivos' },
        { english: 'view inactive employees', spanish: 'ver empleados inactivos' },
        { english: 'visualize all inactive employees', spanish: 'visualizar todos los empleados inactivos' },
        { english: 'visualize inactive employees', spanish: 'visualizar empleados inactivos' },
    ];

    const helpCommands = [
        { english: 'help', spanish: 'ayuda' },
        { english: 'help me', spanish: 'ayúdame' },
        { english: 'need help', spanish: 'necesito ayuda' },
        { english: 'i need help', spanish: 'yo necesito ayuda' },
        { english: 'list of commands', spanish: 'lista de comandos' },
        { english: 'command list', spanish: 'lista de comandos' },
        { english: 'available commands', spanish: 'comandos disponibles' },
    ];

    const terminationCommands = [
        { english: 'termination chart', spanish: 'gráfico de terminaciones' },
        { english: 'termination summary', spanish: 'resumen de terminaciones' },
        { english: 'graph of terminations', spanish: 'gráfico de terminaciones' },
        { english: 'graph of dismissals', spanish: 'gráfico de despidos' },
        { english: 'graph of terminations', spanish: 'gráfico de bajas' },
        { english: 'summary of terminations', spanish: 'resumen de terminaciones' },
        { english: 'summary of dismissals', spanish: 'resumen de despidos' },
        { english: 'summary of terminations', spanish: 'resumen de bajas' },
    ];

    const allLettersCommands = [
        { english: 'all letters', spanish: 'todas las cartas' },
        { english: 'all documents', spanish: 'todos los documentos' },
        { english: 'all files', spanish: 'todos los archivos' },
    ];

    const hiringLettersCommands = [
        { english: 'hiring letters', spanish: 'cartas de contratación' },
        { english: 'hiring documents', spanish: 'documentos de contratación' },
        { english: 'hiring files', spanish: 'archivos de contratación' },
    ];

    const dismissalLettersCommands = [
        { english: 'dismissal letters', spanish: 'cartas de despido' },
        { english: 'dismissal documents', spanish: 'documentos de despido' },
        { english: 'dismissal files', spanish: 'archivos de despido' },
    ];

    const resignationLettersCommands = [
        { english: 'resignation letters', spanish: 'cartas de renuncia' },
        { english: 'resignation documents', spanish: 'documentos de renuncia' },
        { english: 'resignation files', spanish: 'archivos de renuncia' },
    ];

    const columns = [
        { field: 'english', label: 'English' },
        { field: 'spanish', label: 'Spanish' },
    ];

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={onBack}>
                <Text style={styles.backButtonText}>Volver</Text>
            </TouchableOpacity>

            <ScrollView
                style={styles.scrollContainer}
                contentContainerStyle={styles.scrollContentContainer}
            >
                <Text style={styles.sectionTitle}>Comandos de Registro</Text>
                <DataTable data={registrationCommands} columns={columns} />
                <Text style={styles.sectionTitle}>Comandos para Todos los Empleados</Text>
                <DataTable data={allEmployeesCommands} columns={columns} />
                <Text style={styles.sectionTitle}>Comandos para Empleados Activos</Text>
                <DataTable data={activeEmployeesCommands} columns={columns} />
                <Text style={styles.sectionTitle}>Comandos para Empleados Inactivos</Text>
                <DataTable data={inactiveEmployeesCommands} columns={columns} />
                <Text style={styles.sectionTitle}>Comandos de Ayuda</Text>
                <DataTable data={helpCommands} columns={columns} />
                <Text style={styles.sectionTitle}>Comandos para Gráfico de Terminaciones</Text>
                <DataTable data={terminationCommands} columns={columns} />
                <Text style={styles.sectionTitle}>Comandos para Todas las Cartas</Text>
                <DataTable data={allLettersCommands} columns={columns} />
                <Text style={styles.sectionTitle}>Comandos para Cartas de Contratación</Text>
                <DataTable data={hiringLettersCommands} columns={columns} />
                <Text style={styles.sectionTitle}>Comandos para Cartas de Despido</Text>
                <DataTable data={dismissalLettersCommands} columns={columns} />
                <Text style={styles.sectionTitle}>Comandos para Cartas de Renuncia</Text>
                <DataTable data={resignationLettersCommands} columns={columns} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
        width: '100%',
        maxWidth: 1200,
    },
    backButton: {
        position: 'absolute',
        top: 20,
        left: 20,
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
    scrollContainer: {
        flex: 1,
        marginTop: 60,
    },
    scrollContentContainer: {
        padding: 8,
        paddingBottom: 40,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10,
        marginBottom: 10,
    },
});