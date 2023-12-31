import React, { useState, useEffect } from 'react';
import { FlatList, ActivityIndicator } from 'react-native';
import { getListHistoryP2pWhere } from '@utils/userCallApi';
import { colors } from '@themes/colors';
import TransactionItem from './TransactionItem';
import LottieView from 'lottie-react-native';
import { socket } from '../../../helper/AxiosInstance';

const BuyHistory = () => {
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const refreshData = async () => {
    setLoading(true);
    setPage(1);
    setHasMore(true);
    const response = await getListHistoryP2pWhere({ page: 1, limit: 10, where: "side='buy'" });
    if (Array.isArray(response?.data?.array)) {
      setData(response.data.array);
      if (response.data.array.length === 0) {
        setHasMore(false);
      }
    } else {
      console.error('response.data.array is not an array:', response?.data?.array);
    }
    setLoading(false);
  };
  useEffect(() => {
    loadMoreData();
    socket.on("createP2p", (res) => {
      console.log(res, "createP2p");
      refreshData();
    });
    return () => {
      socket.off("createP2p");
      console.log("leave createP2p");
    }
  }, []);

  const loadMoreData = async () => {
    if (!loading && hasMore) {
      setLoading(true);
      const response = await getListHistoryP2pWhere({ 
        limit: 10, 
        page, 
        where: "side='buy'" 
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

  if (data.length === 0) {
    return (
      <LottieView
        source={require('../../../assets/lottie/nodataanimation.json')}
        autoPlay
        loop
        style={{alignSelf: 'center', width: 200, height: 200, marginTop: 200}}
      />
    );
  }

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      style={{ marginTop: 15, marginBottom: 240 }}
      data={data}
      keyExtractor={(item) => item.id.toString()}
      onEndReached={loadMoreData}
      onEndReachedThreshold={0.1}
      ListFooterComponent={() => loading && hasMore && <ActivityIndicator size="large" color={colors.blue} />}
      renderItem={({ item }) => <TransactionItem item={item} />}
    />
  );
};

export default React.memo(BuyHistory);