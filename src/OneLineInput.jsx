// src/OneLineInput.js
import React, { useState, useRef, useEffect } from 'react';
import { TextInput, View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';

export default function OneLineInput({
                                         onPlaceholder,
                                         onType = 'text',
                                         onResult,
                                         isFile = false,
                                         allowDocuments = false,
                                         isSelect = false,
                                         options = [],
                                     }) {
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleInputChange = (value) => {
        setInputValue(value);
    };

    const handleSubmit = () => {
        if (!isFile && inputValue.trim() !== '') {
            if (onResult) onResult(inputValue.trim());
            setInputValue('');
        }
    };

    const handleSelect = (value) => {
        if (value !== '') {
            if (onResult) onResult(value);
            setInputValue('');
        }
    };

    const handleFileSelect = () => {
        if (Platform.OS === 'web') {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = allowDocuments ? '.pdf,.doc,.docx,.xls,.xlsx,image/*' : 'image/*';
            input.onchange = (e) => {
                const file = e.target.files[0];
                if (file && onResult) onResult(file);
                setInputValue('');
            };
            input.click();
        } else {
            // Placeholder para móvil (requiere expo-document-picker)
            alert('Selección de archivos no soportada en móvil');
        }
    };

    if (isSelect) {
        return (
            <View style={styles.selectContainer}>
                <Text style={styles.selectPlaceholder}>{onPlaceholder}</Text>
                {options.map((option, idx) => (
                    <TouchableOpacity
                        key={idx}
                        style={styles.selectOption}
                        onPress={() => handleSelect(option)}
                    >
                        <Text style={styles.selectOptionText}>{option}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        );
    }

    if (isFile) {
        return (
            <TouchableOpacity style={styles.fileButton} onPress={handleFileSelect}>
                <Text style={styles.fileButtonText}>
                    {inputValue ? inputValue.name : onPlaceholder}
                </Text>
            </TouchableOpacity>
        );
    }

    return (
        <View style={styles.inputContainer}>
            <TextInput
                ref={inputRef}
                style={styles.input}
                placeholder={onPlaceholder}
                placeholderTextColor="#666"
                secureTextEntry={onType === 'password'}
                value={inputValue}
                onChangeText={handleInputChange}
                onSubmitEditing={handleSubmit}
                autoCapitalize={onType === 'email' ? 'none' : 'sentences'}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 3,
        padding: Platform.OS === 'web' ? 12 : 10,
        fontSize: 18,
        color: '#333',
        backgroundColor: '#fff',
        width: Platform.OS === 'web' ? 470 : '100%',
        textAlign: 'center',
    },
    fileButton: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 3,
        padding: Platform.OS === 'web' ? 12 : 10,
        backgroundColor: '#fff',
        width: Platform.OS === 'web' ? 470 : '100%',
        alignItems: 'center',
        marginBottom: 10,
    },
    fileButtonText: {
        fontSize: 18,
        color: '#333',
        fontWeight: '300',
    },
    selectContainer: {
        marginBottom: 10,
    },
    selectPlaceholder: {
        fontSize: 18,
        color: '#555',
        fontWeight: '300',
        marginBottom: 5,
        textAlign: 'center',
    },
    selectOption: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 3,
        padding: Platform.OS === 'web' ? 12 : 10,
        marginBottom: 5,
        backgroundColor: '#fff',
        width: Platform.OS === 'web' ? 470 : '100%',
        alignItems: 'center',
    },
    selectOptionText: {
        fontSize: 18,
        color: '#333',
        fontWeight: '300',
    },
});