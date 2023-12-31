import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { colors } from '@themes/colors';
import Input from '@commom/Input';
import { fonts } from '@themes/fonts';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { SelectList } from 'react-native-dropdown-select-list'
import { useTranslation } from 'react-i18next';

interface TransactionFormProps {
    amount: string;
    setAmount: (amount: string) => void;
    receiveAmount: string;
    bankList: any[];
    setSelected: (selectedItem: any) => void;
    setBankListId: (selectedItem: any) => void;
    isChecked: boolean;
    setIsChecked: (isChecked: boolean) => void;
    handleBuyNow: () => void;
    item: any;
    coin: any;
}

const TransactionForm: React.FC<TransactionFormProps> = ({
    amount,
    setAmount,
    receiveAmount,
    bankList,
    setSelected,
    setBankListId,
    isChecked,
    setIsChecked,
    handleBuyNow,
    item,
    coin
}) => {
    const { t } = useTranslation()
    return (
        <View style={{ padding: 10, backgroundColor: colors.gray8, borderRadius: 5, marginTop: 10 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flex: 1 }}>
                    <Text style={{ fontFamily: fonts.AS }}>{t('I will pay')}</Text>
                    <Input
                        height={40}
                        backgroundColor={'white'}
                        value={amount}
                        onChangeText={setAmount}
                        radius={3}
                        coin={item.side === 'buy' ? coin?.name : 'VND'}
                    />
                </View>
                <View style={{ padding: 5 }}></View>
                <View style={{ flex: 1 }}>
                    <Text style={{ fontFamily: fonts.AS }}>{t('To receive')}</Text>
                    <Input
                        value={receiveAmount}
                        height={40}
                        backgroundColor={colors.gray7}
                        readonly
                        radius={3}
                        coin={item.side === 'buy' ? 'VND' : coin?.name}
                    />
                </View>
            </View>
            <View style={{ marginTop: 10 }}>
                <Text style={{ fontFamily: fonts.AS }}>{t('Choose your payment')}</Text>
                <SelectList
                    placeholder={t('Choose your bank')}
                    fontFamily={fonts.AS}
                    boxStyles={{ marginTop: 5 }}
                    inputStyles={{ color: colors.black3, fontFamily: fonts.AS }}
                    setSelected={(selectedItem: any) => {
                        setSelected(selectedItem);
                        setBankListId(selectedItem);
                    }}
                    data={bankList} />

            </View>
            <View style={{ marginTop: 15 }}>
                <BouncyCheckbox
                    size={25}
                    fillColor="green"
                    unfillColor="#FFFFFF"
                    text={t('By Clicking Continue, You Agree to Sereso\'s P2P Terms of Service')}
                    style={{ width: '90%' }}
                    textStyle={{ textDecorationLine: "none" }}
                    onPress={setIsChecked}
                    isChecked={isChecked} />
            </View>

            <TouchableOpacity onPress={handleBuyNow} style={{ marginTop: 15, backgroundColor: colors.violet, padding: 10, borderRadius: 5 }}>
                <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>{t('Buy now')}</Text>
            </TouchableOpacity>
        </View>
    )
};

export default React.memo(TransactionForm);