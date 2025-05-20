import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-native-modal';
import EmployeeRule from '../rule/EmployeeRule';
import DataTable from '../../src/DataTable';
import TerminationForm from '../view/TerminationForm';
import EmployeeDetailsModal from '../view/EmployeeDetailsModal';

export default function EmployeeTable({ onBack, initialStatusFilter = true }) {
    const employeeRule = EmployeeRule();
    const [employees, setEmployees] = useState([]);
    const [statusFilter, setStatusFilter] = useState(initialStatusFilter);
    const [loading, setLoading] = useState(false);
    const [showTerminationModal, setShowTerminationModal] = useState(false);
    const [showInfoModal, setShowInfoModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const fetchEmployees = async (status) => {
        try {
            setLoading(true); // Activar loading antes del fetch
            const employeeList = await employeeRule.getEmployeesByStatus(status);
            console.log('Fetched employees:', employeeList); // Depuración
            setEmployees(employeeList);
        } catch (error) {
            console.log('Error fetching employees:', error);
            toast.error('Error al cargar empleados.', {
                position: 'top-right',
                autoClose: 3000,
            });
        } finally {
            setLoading(false); // Desactivar loading después del fetch
        }
    };

    useEffect(() => {
        fetchEmployees(statusFilter);
    }, [statusFilter]);

    const handleFilterChange = (value) => {
        if (value === 'Active') {
            setStatusFilter(true);
        } else if (value === 'Inactive') {
            setStatusFilter(false);
        } else {
            setStatusFilter('All');
        }
    };

    const handleSubscribeClick = async (employee) => {
        setLoading(true);
        try {
            await employeeRule.subscribeEmployee(employee.identification);
            toast.success('¡Empleado suscrito exitosamente!', {
                position: 'top-right',
                autoClose: 3000,
            });
            await fetchEmployees(statusFilter);
        } catch (error) {
            console.log('Error subscribing employee:', error);
            toast.error('No se pudo suscribir al empleado.', {
                position: 'top-right',
                autoClose: 3000,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleUnsubscribeClick = (employee) => {
        setSelectedEmployee(employee);
        setShowTerminationModal(true);
    };

    const handleUnsubscribeSuccess = () => {
        toast.success('¡Empleado desuscrito exitosamente!', {
            position: 'top-right',
            autoClose: 3000,
        });
        fetchEmployees(statusFilter);
        closeModal();
    };

    const handleViewInfoClick = (employee) => {
        setSelectedEmployee(employee);
        setShowInfoModal(true);
    };

    const closeModal = () => {
        setShowTerminationModal(false);
        setShowInfoModal(false);
        setSelectedEmployee(null);
    };

    const columns = [
        { field: 'identification', label: 'Identification' },
        { field: 'firstName', label: 'First Name' },
        { field: 'lastName', label: 'Last Name' },
        {
            field: 'status',
            label: 'Status',
            format: (value) => (value ? 'Active' : 'Inactive'), // Formatear booleano a string
        },
    ];
    console.log('Columns:', columns);

    const actions = (employee) => (
        <View style={styles.actionsContainer}>
            {employee.status ? (
                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleUnsubscribeClick(employee)}
                >
                    <Text style={styles.actionButtonText}>Unsubscribe</Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleSubscribeClick(employee)}
                >
                    <Text style={styles.actionButtonText}>Subscribe</Text>
                </TouchableOpacity>
            )}
            <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleViewInfoClick(employee)}
            >
                <Text style={styles.actionButtonText}>View Info</Text>
            </TouchableOpacity>
        </View>
    );

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

                <ScrollView
                    style={styles.scrollContainer}
                    contentContainerStyle={styles.scrollContentContainer}
                >
                    <View style={styles.contentWrapper}>
                        <View style={styles.filterContainer}>
                            <Text style={styles.filterLabel}>Filter by Status:</Text>
                            <View style={styles.selectContainer}>
                                {['Active', 'Inactive', 'All'].map((option) => (
                                    <TouchableOpacity
                                        key={option}
                                        style={[
                                            styles.selectOption,
                                            statusFilter === (option === 'Active' ? true : option === 'Inactive' ? false : 'All') && styles.selectOptionActive,
                                        ]}
                                        onPress={() => handleFilterChange(option)}
                                    >
                                        <Text
                                            style={[
                                                styles.selectOptionText,
                                                statusFilter === (option === 'Active' ? true : option === 'Inactive' ? false : 'All') && styles.selectOptionTextActive,
                                            ]}
                                        >
                                            {option}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                        <View style={styles.tableWrapper}>
                            <DataTable data={employees} columns={columns} actions={actions} />
                        </View>
                    </View>
                </ScrollView>
                <Modal
                    isVisible={showTerminationModal}
                    onBackdropPress={closeModal}
                    style={styles.modal}
                >
                    <View style={styles.modalContent}>
                        {selectedEmployee && (
                            <TerminationForm
                                employeeId={selectedEmployee.identification}
                                onSuccess={handleUnsubscribeSuccess}
                            />
                        )}
                    </View>
                </Modal>
                <Modal
                    isVisible={showInfoModal}
                    onBackdropPress={closeModal}
                    style={styles.modal}
                >
                    <View style={styles.modalContent}>
                        {selectedEmployee && (
                            <EmployeeDetailsModal employee={selectedEmployee} onClose={closeModal} />
                        )}
                    </View>
                </Modal>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        width: '100%',
        maxWidth: 1200,
    },
    backButton: {
        position: 'absolute',
        top: 60,
        left: 0,
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
    contentWrapper: {
        width: '100%',
        maxWidth: '100%',
        marginTop: 120,
    },
    tableWrapper: {
        width: '100%', // Asegura que la tabla use todo el ancho disponible
    },
    filterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        paddingHorizontal: 20,
    },
    filterLabel: {
        fontSize: 16,
        fontWeight: '600',
        marginRight: 10,
        color: '#333',
    },
    selectContainer: {
        flexDirection: 'row',
        gap: 10,
    },
    selectOption: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: '#f9f9f9',
    },
    selectOptionActive: {
        backgroundColor: '#007bff',
        borderColor: '#007bff',
    },
    selectOptionText: {
        fontSize: 16,
        color: '#333',
    },
    selectOptionTextActive: {
        color: '#fff',
    },
    scrollContainer: {
        flex: 1,
    },
    scrollContentContainer: {
        padding: 20,
        paddingBottom: 40,
        backgroundColor: '#fff',
    },
    actionsContainer: {
        flexDirection: 'row',
        gap: 10,
    },
    actionButton: {
        padding: 8,
        backgroundColor: '#007bff',
        borderRadius: 5,
    },
    actionButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: 500,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
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