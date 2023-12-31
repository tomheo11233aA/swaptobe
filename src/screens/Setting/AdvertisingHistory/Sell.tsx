import { FlatList, View, Text } from 'react-native'
import React, { useEffect, memo, useState } from 'react'
import { getListAdsSellToUser } from '@utils/userCallApi'
import { getListAdsSellPenddingToUser } from '@utils/userCallApi'
import LottieView from 'lottie-react-native'
import { colors } from '@themes/colors'
import { ActivityIndicator } from 'react-native'
import AdvertisingItem from './AdvertisingItem'
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useTranslation } from 'react-i18next';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { fonts } from '@themes/fonts'

const Sell = () => {
    const { t } = useTranslation()
    const [data, setData] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [isChecked, setIsChecked] = useState(false);

    const loadMoreData = async () => {
        if (!loading && hasMore) {
            setLoading(true);
            const response = await getListAdsSellToUser({
                limit: 10,
                page,
            });
            if (Array.isArray(response?.data?.array)) {
                setData(prevData => [...prevData, ...response.data.array]);
                if (response.data.array.length === 0) {
                    setHasMore(false);
                }
            } else {
                console.error('response.data.array is not an array:', response?.data?.array);
            }
            setPage(page + 1);
            setLoading(false);
        }
    };

    const loadMoreDataPending = async () => {
        if (!loading && hasMore) {
            setLoading(true);
            const response = await getListAdsSellPenddingToUser({
                limit: 10,
                page,
            });
            if (Array.isArray(response?.data?.array)) {
                setData(prevData => [...prevData, ...response.data.array]);
                if (response.data.array.length === 0) {
                    setHasMore(false);
                }
            } else {
                console.error('response.data.array is not an array:', response?.data?.array);
            }
            setPage(page + 1);
            setLoading(false);
        }
    }

    useEffect(() => {
        if (isChecked) {
            loadMoreDataPending()
        } else {
            loadMoreData()
        }
    }, [isChecked])

    if (data.length === 0) {
        return (
            <>
                <View style={{
                    flexDirection: 'row',
                    alignSelf: 'flex-end',
                    position: 'absolute',
                    marginTop: hp('3.5%'),
                    alignItems: 'center',
                }}>
                    <BouncyCheckbox
                        size={25}
                        fillColor={colors.violet}
                        unfillColor="#FFFFFF"
                        iconStyle={{ borderColor: colors.violet }}
                        onPress={
                            () => {
                                setIsChecked(!isChecked)
                                setData([])
                                setPage(1)
                                setHasMore(true)
                            }
                        }
                        isChecked={isChecked}
                    />
                    <Text style={{ fontFamily: fonts.JR }}>{t('Pending')}</Text>
                </View>
                <LottieView
                    source={require('../../../assets/lottie/searchNodata.json')}
                    autoPlay
                    loop
                    style={{ alignSelf: 'center', width: wp('90%'), height: hp('50%'), marginTop: hp('10%') }}
                />
            </>
        );
    }

    return (
        <>
            <View style={{
                flexDirection: 'row',
                alignSelf: 'flex-end',
                position: 'absolute',
                marginTop: hp('3.5%'),
                alignItems: 'center',
            }}>
                <BouncyCheckbox
                    size={25}
                    fillColor={colors.violet}
                    unfillColor="#FFFFFF"
                    iconStyle={{ borderColor: colors.violet }}
                    onPress={
                        () => {
                            setIsChecked(!isChecked)
                            setData([])
                            setPage(1)
                            setHasMore(true)
                        }
                    }
                    isChecked={isChecked}
                />
                <Text style={{ fontFamily: fonts.JR }}>{t('Pending')}</Text>
            </View>
            <FlatList
                showsVerticalScrollIndicator={false}
                style={{
                    marginTop: hp('2%'),
                    marginBottom: hp('27%'),
                }}
                data={data}
                keyExtractor={(item) => item.id.toString()}
                onEndReached={isChecked ? loadMoreDataPending : loadMoreData}
                onEndReachedThreshold={0.1}
                ListFooterComponent={() => loading && hasMore && <ActivityIndicator size="large" color={colors.blue} />}
                renderItem={({ item }) => <AdvertisingItem item={item} />}
            />
        </>
    )
}

export default memo(Sell)

