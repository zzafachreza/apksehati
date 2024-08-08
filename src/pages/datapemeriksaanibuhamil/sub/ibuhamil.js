import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../../../utils'
import { MyHeader, MyPicker } from '../../../components'
import { ScrollView } from 'react-native'

export default function IbuHamil({navigation}) {


    const handleValueChange = (value) => {
     


        switch (value) {
            case 'Ttrisemester I':
              navigation.navigate('TrisemesterI'); // Ganti dengan nama halaman yang sesuai
              break;
            case 'Trisemester II - 1':
              navigation.navigate('TrisemesterII1'); // Ganti dengan nama halaman yang sesuai
              break;
            case 'Trisemester II - 2':
              navigation.navigate('TrisemesterII1'); // Ganti dengan nama halaman yang sesuai
              break;
            case 'Trisemester III - 1':
              navigation.navigate('TrisemesterIII1'); // Ganti dengan nama halaman yang sesuai
              break;
            case 'Trisemester III - 2':
              navigation.navigate('TrisemesterIII2'); // Ganti dengan nama halaman yang sesuai
              break;
            case 'Trisemester III - 3':
              navigation.navigate('TrisemesterIII3'); // Ganti dengan nama halaman yang sesuai
              break;
            default:
              break;
          }
    }
  return (
    <View  style={{flex:1, backgroundColor:colors.white}}>
    <MyHeader title="Ibu Hamil"/>

    <ScrollView>
        <View style={{padding:10}}>
            <View>
                <MyPicker label="Trisemester" data={[
                    { label: 'Pilih Trisemester', value: '' },
                    { label: 'Trisemester I', value: 'Ttrisemester I' },
                    { label: 'Trisemester II - 1', value: 'Trisemester II - 1' },
                    { label: 'Trisemester II - 2', value: 'Trisemester II - 2' },
                    { label: 'Trisemester III - 1', value: 'Trisemester III - 1' },
                    { label: 'Trisemester III - 2', value: 'Trisemester III - 2' },
                    { label: 'Trisemester III - 3', value: 'Trisemester III - 3' },
                ]}

                    onValueChange={handleValueChange}
                />
            </View>
        </View>
    </ScrollView>
    </View>
  )
}