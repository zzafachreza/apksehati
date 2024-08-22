import { View, Text, Image, TouchableNativeFeedback, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, fonts } from '../../utils'
import { MyHeader } from '../../components'
import axios from 'axios'
import { apiURL } from '../../utils/localStorage'

export default function Kuesioner({ navigation }) {
  const handleBack = () => {
    navigation.goBack();
  }

  const [comp, setComp] = useState({});

  useEffect(() => {
    axios.post(apiURL + 'company').then(res => {
      console.log(res.data.data);
      setComp(res.data.data);
    })
  }, [])
  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <MyHeader onPress={handleBack} title="Kuesioner" />

      <View style={{ padding: 20, alignItems: 'center', marginTop: 100 }}>
        <TouchableNativeFeedback onPress={() => Linking.openURL(comp.website)}>
          <View>

            <Image style={{ width: 267, height: 267 }} source={require('../../assets/icon_kuesioner.png')} />
            <Text style={{
              fontFamily: fonts.primary[600], fontSize: 20, color: colors.tekscolor, marginTop: 20
              , textAlign: 'center'
            }}>Silakan isi kuesioner ini</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  )
}