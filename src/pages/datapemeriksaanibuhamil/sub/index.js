import { View, Text, ScrollView, TouchableNativeFeedback, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, fonts } from '../../../utils'
import { MyGap, MyHeader } from '../../../components'
import { getData } from '../../../utils/localStorage'


export default function SubDataPemeriksaanIbuHami({ navigation }) {

    const [user, setUser] = useState({})
    useEffect(() => {
        getData('user').then(u => {
            setUser(u)
        })
    }, [])
    return (
        <View style={{ flex: 1, backgroundColor: colors.white }}>
            <MyHeader title="Data Hasil Pemeriksaan" />
            <ScrollView>
                <View style={{ padding: 20, }}>


                    <TouchableNativeFeedback onPress={() => navigation.navigate('IbuHamil', user)}>
                        <View style={{ padding: 10, backgroundColor: colors.primary, borderRadius: 10, }}>
                            <Text style={{
                                fontFamily: fonts.primary[600],
                                textAlign: 'center',
                                color: 'white',
                                fontSize: 20
                            }}>Ibu Hamil</Text>
                        </View>
                    </TouchableNativeFeedback>

                    <MyGap jarak={20} />


                    <TouchableNativeFeedback onPress={() => navigation.navigate('IbuBersalin', user)}>
                        <View style={{ padding: 10, backgroundColor: colors.primary, borderRadius: 10, }}>
                            <Text style={{
                                fontFamily: fonts.primary[600],
                                textAlign: 'center',
                                color: 'white',
                                fontSize: 20
                            }}>Ibu Bersalin</Text>
                        </View>
                    </TouchableNativeFeedback>

                    <MyGap jarak={20} />



                    <TouchableNativeFeedback onPress={() => navigation.navigate('IbuNifas', user)}>
                        <View style={{ padding: 10, backgroundColor: colors.primary, borderRadius: 10, }}>
                            <Text style={{
                                fontFamily: fonts.primary[600],
                                textAlign: 'center',
                                color: 'white',
                                fontSize: 20
                            }}>Ibu Nifas</Text>
                        </View>
                    </TouchableNativeFeedback>




                </View>



            </ScrollView>
        </View>
    )
}