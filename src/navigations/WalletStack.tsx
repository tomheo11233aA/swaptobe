import { screens } from '@contants/screens'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TopTabWallet from '@screens/TopTabWallet'
import React from 'react'
import Transaction from '@screens/TopTabWallet/P2p/Transaction'
import ConfirmTransaction from '@screens/TopTabWallet/P2p/ConfirmTransaction'
import { ConfirmTransactionProps } from '@screens/TopTabWallet/P2p/ConfirmTransaction'
import { ComponentProps } from 'react'

const Stack = createNativeStackNavigator()
const WalletStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={screens.TOP_TAB_WALLET} component={TopTabWallet} />
            <Stack.Screen name={screens.TRANSACTION} component={Transaction} />
            <Stack.Screen name={screens.CONFIRM_TRANSACTION} component={ConfirmTransaction as React.FC} />
        </Stack.Navigator>
    )
}

export default WalletStack