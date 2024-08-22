import { View, Text, ImageBackground, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { MyHeader } from '../../components'
import { ScrollView } from 'react-native'
import { TouchableNativeFeedback } from 'react-native'
import { Image } from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import axios from 'axios'
import { apiURL } from '../../utils/localStorage'
import { Color, colors, fonts, windowWidth } from '../../utils'
import { Icon } from 'react-native-elements'

export default function Artikel({ navigation }) {
  const backPage = () => {
    navigation.goBack()
  };


  const isFocused = useIsFocused();

  const [data, setData] = useState([]);

  useEffect(() => {

    if (isFocused) {
      getTransaction();
    }


  }, [isFocused]);


  const getTransaction = () => {
    axios.post(apiURL + 'artikel').then(res => {
      console.log(res.data);
      setData(res.data);
    })
  }

  return (
    <ImageBackground source={require('../../assets/bgsplash.png')} style={{
      flex: 1, width: '100%', height: '100%',
    }}>
      <MyHeader onPress={backPage} title="Artikel" />
      <View style={{
        flex: 1,
        padding: 16
      }}>
        <FlatList showsVerticalScrollIndicator={false} data={data} renderItem={({ item, index }) => {
          return (
            <TouchableOpacity onPress={() => navigation.navigate('ArtikelDetail', item)} style={{
              backgroundColor: Color.blueGray[100],
              marginVertical: 8,
              borderRadius: 12,
              overflow: 'hidden'

            }}>
              <View style={{
                padding: 16,
                flexDirection: 'row',
                alignItems: 'center'
              }}>
                <Text style={{
                  flex: 1,
                  fontFamily: fonts.secondary[600],
                  fontSize: 16,
                }}>{item.judul}</Text>
                <Icon type='ionicon' name='search' color={colors.primary} />
              </View>
            </TouchableOpacity>
          )
        }} />
      </View>
    </ImageBackground>
  )
}