import KeyBoardSafe from '@reuse/KeyBoardSafe'
import { colors } from '@themes/colors'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import User from './User'
import Txt from '@commom/Txt'
import Box from '@commom/Box'
import ReferralItem from './ReferralItem'
import List from './List'
// '#edebf0'
const Setting = () => {
  return (
    <LinearGradient
      style={{ flex: 1 }}
      end={{ x: 1, y: 0.5 }}
      start={{ x: 0, y: 0.5 }}
      colors={[colors.darkViolet, colors.violet]}
    >
      <KeyBoardSafe>
        <Box paddingHorizontal={15} marginBottom={10}>
          <Txt color={'white'} bold size={20}>
            Setting
          </Txt>
        </Box>
        <Box flex={1} backgroundColor={colors.gray5} paddingHorizontal={15}>
          <User />
          <Box row justifySpaceBetween>
            <ReferralItem
              title={'Referral link'}
            />
            <ReferralItem
              title={'Referral code'}
            />
          </Box>
          <List />
        </Box>
      </KeyBoardSafe>
    </LinearGradient>
  )
}

export default Setting