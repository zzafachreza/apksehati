import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ScrollView, TouchableNativeFeedback, Modal, TouchableOpacity, Image, FlatList, Alert } from 'react-native';
import { colors, fonts } from '../../utils';
import { MyButton, MyHeader, MyRadio } from '../../components';
import axios from 'axios';
import { apiURL, MYAPP } from '../../utils/localStorage';
import { showMessage } from 'react-native-flash-message';
import moment from 'moment';
import { useIsFocused } from '@react-navigation/native';

export default function Detail({ route, navigation }) {

    const ITEM = route.params;

    const handleBack = () => {
        navigation.goBack()
    }

    const [soal, setSoal] = useState([]);
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            __getSoal();
            __getData();
        }
    }, [isFocused]);



    const __getSoal = () => {
        axios.post(apiURL + 'get_kolom', {
            table: route.params.table
        }).then(res => {

            setSoal(res.data);

        })
    }
    const [data, setData] = useState([]);

    const __getData = () => {
        axios.post(apiURL + 'get_data', {
            table: route.params.table,
            id: route.params.id
        }).then(res => {
            console.log(res.data);
            setData(res.data);

        })
    }

    const [kirim, setKirim] = useState({
        fid_user: route.params.fid_user,
        minggu_ke: route.params.minggu_ke,
    })
    return (
        <View style={{ flex: 1, backgroundColor: colors.white }}>
            <MyHeader onPress={handleBack} title={'Detail ' + ITEM.menu} />

            <View style={{
                flexDirection: 'row',
                marginBottom: 10,
                padding: 4,
            }}>
                <View style={{
                    flex: 1,
                    paddingRight: 5,
                }}>
                    <MyButton onPress={() => {
                        Alert.alert(MYAPP, 'Apakah kamu yakin akan hapus ini ?', [
                            { text: 'TIDAK' },
                            {
                                text: 'YA, Hapus',
                                onPress: () => {
                                    console.log(ITEM.id);
                                    axios.post(apiURL + 'delete_data', {
                                        table: ITEM.table,
                                        id: ITEM.id
                                    }).then(res => {
                                        if (res.data.status == 200) {
                                            showMessage({
                                                type: 'success',
                                                icon: 'success',
                                                message: res.data.message,
                                            });
                                            navigation.goBack();
                                        }
                                    })
                                }
                            }
                        ])
                    }} title="Hapus" warna={colors.danger} />
                </View>
                {/* <View style={{
                    flex: 1,
                    paddingLeft: 5,
                }}>
                    <MyButton title="Edit" onPress={() => {
                        if (ITEM.table == 'cekhamil') {
                            navigation.navigate('EditHamil', {
                                data: data,
                                id: ITEM.id
                            })
                        } else if (ITEM.table == 'cekbersalin') {
                            navigation.navigate('EditMelahirkan', {
                                data: data,
                                id: ITEM.id
                            })
                        } else if (ITEM.table == 'ceknifas') {
                            navigation.navigate('EditMenyusui', {
                                data: data,
                                id: ITEM.id
                            })
                        }
                    }} warna={colors.secondary} />
                </View> */}
            </View>
            <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: '#F5FCFF', }}>

                <Text style={{
                    fontFamily: fonts.primary[400],
                    fontSize: 14,
                    textAlign: 'center',
                    marginBottom: 20,
                }}>Tanggal {moment(route.params.tanggal).format('DD MMMM YYYY')}</Text>

                <FlatList data={soal} renderItem={({ item, index }) => {
                    return (


                        <View style={{
                            marginHorizontal: 10,
                            borderBottomWidth: 1,
                            marginVertical: 5, borderBottomColor: colors.border, paddingHorizontal: 4, flexDirection: "row", alignItems: 'center'
                        }}>
                            <View style={{ padding: 4, width: '70%' }}>

                                <Text style={{ fontFamily: fonts.primary[400], textAlign: 'justify', fontSize: 12, color: colors.tekscolor }}>
                                    {item.soal}
                                </Text>
                            </View>

                            <View style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text style={{ fontFamily: fonts.primary[800], textAlign: 'justify', fontSize: 12, color: colors.tekscolor }}>{data[item.kolom]}</Text>
                            </View>



                        </View>


                    )
                }} />


            </ScrollView >


        </View >
    );
}