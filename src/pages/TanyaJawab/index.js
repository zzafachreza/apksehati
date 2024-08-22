import { View, Text, Image, TouchableNativeFeedback, Linking } from 'react-native'
import React, { useEffect } from 'react'
import { colors, fonts } from '../../utils'
import { MyHeader } from '../../components'
import { useState } from 'react'
import axios from 'axios'
import { apiURL } from '../../utils/localStorage'

export default function TanyaJawab({ navigation }) {
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
      <MyHeader onPress={handleBack} title="Tanya Jawab" />

      <View style={{ padding: 20, alignItems: 'center', marginTop: 100 }}>
        <TouchableNativeFeedback onPress={() => Linking.openURL('https://wa.me/' + comp.tlp + "?text=Halo, saya mau tanya mengenai kesehatan kehamilan")}>
          <View>

            <Image style={{ width: 200, height: 200 }} source={require('../../assets/wa.png')} />
            <Text style={{ fontFamily: fonts.primary[600], fontSize: 20, color: colors.tekscolor, marginTop: 20 }}>Silakan Hubungi Kami</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  )
}