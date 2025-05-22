import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Platform, Linking, Alert, ScrollView } from 'react-native';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LetterRule from '../rule/LetterRule';
import DataTable from '../../src/DataTable';

export default function Letters({ onBack, initialStatusFilter = 'All' }) {
    const letterRule = LetterRule();
    const [letters, setLetters] = useState([]);
    const [folderFilter, setFolderFilter] = useState(initialStatusFilter);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchLetters = async (folder) => {
        setLoading(true);
        setError(null);
        setLetters([]);
        try {
            let letterList = [];
            if (folder === 'All') {
                const structure = await letterRule.getAllLetters();
                console.log('File structure after getAllLetters:', structure);
                const hiringLetters = letterRule.getFilesByFolder('hiring').map(file => ({
                    ...file,
                    folder: 'Hiring',
                }));
                const dismissalLetters = letterRule.getFilesByFolder('termination.dismissal').map(file => ({
                    ...file,
                    folder: 'Dismissal',
                }));
                const resignationLetters = letterRule.getFilesByFolder('termination.resignation').map(file => ({
                    ...file,
                    folder: 'Resignation',
                }));
                console.log('Hiring letters:', hiringLetters);
                console.log('Dismissal letters:', dismissalLetters);
                console.log('Resignation letters:', resignationLetters);
                letterList = [...hiringLetters, ...dismissalLetters, ...resignationLetters];
            } else {
                const folderMapping = {
                    'Hiring': 'hiring',
                    'Dismissal': 'termination.dismissal',
                    'Resignation': 'termination.resignation',
                };
                const folderKey = folderMapping[folder];
                await letterRule.getAllLetters();
                letterList = letterRule.getFilesByFolder(folderKey).map(file => ({
                    ...file,
                    folder: folder,
                }));
                console.log(`${folder} letters:`, letterList);
            }
            console.log('Fetched letters:', letterList);
            setLetters(letterList);
        } catch (error) {
            console.error('Error fetching letters:', error);
            setError('Error al cargar las cartas. Intenta de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLetters(folderFilter);
    }, [folderFilter]);

    const downloadFile = async (file) => {
        try {
            if (Platform.OS === 'web') {
                window.open(file.url, '_blank'); // Abrir en nueva pestaña
                toast.success(`Archivo ${file.name} abierto en nueva pestaña.`, {
                    position: 'top-right',
                    autoClose: 3000,
                });
            } else {
                const supported = await Linking.canOpenURL(file.url);
                if (!supported) {
                    throw new Error('No se puede abrir la URL del archivo.');
                }
                await Linking.openURL(file.url);
                Alert.alert('Éxito', `Archivo ${file.name} abierto para descarga o visualización.`);
            }
        } catch (error) {
            console.error('Error descargando/abriendo el archivo:', error);
            if (Platform.OS === 'web') {
                toast.error('No se pudo abrir el archivo en nueva pestaña. Intenta de nuevo.', {
                    position: 'top-right',
                    autoClose: 3000,
                });
            } else {
                Alert.alert('Error', 'No se pudo descargar o abrir el archivo. Intenta de nuevo.');
            }
        }
    };

    const handleFilterChange = (value) => {
        setFolderFilter(value);
    };

    const columns = [
        { field: 'name', label: 'Name' },
        { field: 'folder', label: 'Folder' },
    ];

    const actions = (file) => (
        <View style={styles.actionsContainer}>
            <TouchableOpacity
                style={styles.actionButton}
                onPress={() => downloadFile(file)}
            >
                <Text style={styles.actionButtonText}>Download</Text>
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
            <View style={styles.root}>
                <TouchableOpacity style={styles.backButton} onPress={onBack}>
                    <Text style={styles.backButtonText}>Volver</Text>
                </TouchableOpacity>

                <ScrollView
                    style={styles.scrollContainer}
                    contentContainerStyle={styles.scrollContentContainer}
                >
                    <View style={styles.contentWrapper}>
                        <Text style={styles.header}>Letters File System</Text>

                        {/* Mostrar el filtro siempre, incluso si hay error o no hay cartas */}
                        <View style={styles.filterContainer}>
                            <Text style={styles.filterLabel}>Filter by Folder:</Text>
                            <View style={styles.selectContainer}>
                                {['All', 'Hiring', 'Dismissal', 'Resignation'].map((option) => (
                                    <TouchableOpacity
                                        key={option}
                                        style={[
                                            styles.selectOption,
                                            folderFilter === option && styles.selectOptionActive,
                                        ]}
                                        onPress={() => handleFilterChange(option)}
                                    >
                                        <Text
                                            style={[
                                                styles.selectOptionText,
                                                folderFilter === option && styles.selectOptionTextActive,
                                            ]}
                                        >
                                            {option}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>

                        {/* Mostrar mensaje de error o "no hay cartas" debajo del filtro */}
                        {error ? (
                            <View style={styles.errorContainer}>
                                <Text style={styles.errorText}>{error}</Text>
                            </View>
                        ) : !letters.length ? (
                            <View style={styles.emptyContainer}>
                                <Text style={styles.emptyText}>No hay cartas disponibles para mostrar. Prueba con otro filtro.</Text>
                            </View>
                        ) : (
                            <View style={styles.tableWrapper}>
                                <DataTable data={letters} columns={columns} actions={actions} />
                            </View>
                        )}
                    </View>
                </ScrollView>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    root: {
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
    contentWrapper: {
        width: '100%',
        maxWidth: '100%',
    },
    tableWrapper: {
        width: '100%',
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
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    errorContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    errorText: {
        fontSize: 16,
        color: 'red',
    },
    emptyContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyText: {
        fontSize: 16,
        color: '#333',
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