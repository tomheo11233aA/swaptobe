import React from 'react';
import { Table, Row } from 'react-native-table-component';
import { colors } from '@themes/colors'
import { StyleSheet } from 'react-native'
import { Dimensions } from 'react-native';
import { useTranslation } from 'react-i18next';

interface TransactionTableProps {
    tableData: any[];
    showModal: () => void;
}

const TransactionTable: React.FC<TransactionTableProps> = ({ tableData, showModal }) => {
    const { t } = useTranslation();
    const windowWidth = Dimensions.get('window').width;
    const padding = 20;
    const borderWidth = 1;
    const adjustedWidth = windowWidth - 2 * (padding + borderWidth);
    const columnWidthRatios = [0.33, 0.67];
    const tableHead = [t('Transaction Id'), 
    t('Status'),
    t('Payment'),
    t('You receive'),
    t('Exchange rate'),
    t('Amount'),
    t('Time'),
    t('Note')
]
    const rowDataWithHeader = tableHead.map((header, index) => [header, ...tableData.map(row => row[index])]);
    return (
        <Table borderStyle={styles.tableBorder}>
            {
                rowDataWithHeader.map((rowData, index) => (
                    <Row
                        key={index}
                        data={rowData}
                        style={{ ...styles.row, ...(index % 2 ? styles.rowAlternate : {}) }}
                        textStyle={{margin: 6, flexShrink: 1, fontWeight: 'bold' }}
                        widthArr={columnWidthRatios.map(ratio => adjustedWidth * ratio)}
                    />
                ))
            }
        </Table>
    );
}

const styles = StyleSheet.create({
    tableBorder: { borderWidth: 1, borderColor: colors.gray8 },
    row: { minHeight: 40, backgroundColor: 'white' },
    rowAlternate: { backgroundColor: colors.gray5 },
})

export default TransactionTable;