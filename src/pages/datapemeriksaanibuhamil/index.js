import { View, Text, ScrollView, TouchableNativeFeedback, FlatList, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, fonts } from '../../utils'
import { MyHeader } from '../../components'
import { Image } from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import { apiURL, getData } from '../../utils/localStorage'
import axios from 'axios'
import moment from 'moment'
import { Icon } from 'react-native-elements'

export default function DataPemeriksaanIbuHami({ navigation }) {

  const [data, setData] = useState([]);
  const isFocused = useIsFocused();

  const backPage = () => {
    navigation.goBack()
  };


  useEffect(() => {
    __transaction();
  }, [isFocused]); // Refresh notes when screen is focused

  const __transaction = () => {
    getData('user').then(u => {
      axios.post(apiURL + 'riwayat_data', {
        fid_user: u.id
      }).then(res => {
        console.log(res.data);
        setData(res.data);
      })
    })
  }

  const handleBack = () => {
    navigation.goBack()
  }
  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <MyHeader onPress={handleBack} title="Data Hasil Pemerikasan" />
      <ScrollView>
        <View style={{ padding: 10, flex: 1 }}>
          <FlatList data={data} renderItem={({ item, index }) => {
            return (
              <TouchableWithoutFeedback onPress={() => {
                if (item.table == 'cekhamil') {
                  navigation.navigate('DetailHamil', item)
                } else {
                  navigation.navigate('Detail', item)
                }
              }}>
                <View style={{
                  padding: 10,
                  borderWidth: 1,
                  borderRadius: 12,
                  borderColor: colors.border,
                  marginVertical: 5,
                  flexDirection: 'row',
                  alignItems: 'center'
                }}>
                  <View style={{
                    flex: 1,
                  }}>
                    <Text style={{ fontFamily: fonts.secondary[800], fontSize: 14 }}>{item.menu}</Text>

                    <Text style={{ fontFamily: fonts.secondary[600], fontSize: 14, color: colors.secondary }}>{item.info}</Text>

                    <Text style={{ fontFamily: fonts.secondary[400], fontSize: 14, color: colors.primary }}>{moment(item.tanggal).format('DD MMMM YYYY')}</Text>
                  </View>
                  <View>
                    <Icon type='ionicon' name='search' color={colors.primary} />
                  </View>
                </View>
              </TouchableWithoutFeedback>
            )
          }} />
        </View>
      </ScrollView>
      <TouchableNativeFeedback onPress={() => navigation.navigate("SubDataPemeriksaanIbuHamil")}>
        <View style={{ flexDirection: 'row', padding: 20, justifyContent: 'flex-end' }}>
          <View>
            <Image style={{ width: 63, height: 57 }} source={require("../../assets/add.png")} />
          </View>
        </View>
      </TouchableNativeFeedback>
    </View>
  )
}