// src/DataTable.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DataTable({ data, columns, actions = null }) {
    return (
        <View style={styles.table}>
            <View style={styles.header}>
                {columns.map((col) => (
                    <Text key={col.field} style={styles.headerText}>
                        {col.label}
                    </Text>
                ))}
                {actions && (
                    <Text style={styles.headerText}>Actions</Text>
                )}
            </View>
            {data.map((item, idx) => (
                <View key={idx} style={styles.row}>
                    {columns.map((col) => (
                        <Text key={col.field} style={styles.cell}>
                            {col.format ? col.format(item[col.field]) : item[col.field]}
                        </Text>
                    ))}
                    {actions && (
                        <View style={styles.cell}>{actions(item)}</View>
                    )}
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    table: {
        // Sin flex: 1 para usar altura natural
    },
    header: {
        flexDirection: 'row',
        backgroundColor: '#f4f4f4',
        padding: 10,
    },
    headerText: {
        flex: 1,
        fontWeight: 'bold',
        fontSize: 16,
    },
    row: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    cell: {
        flex: 1,
        fontSize: 14,
    },
});