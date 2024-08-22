import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ScrollView, TouchableNativeFeedback, Modal, TouchableOpacity, Image, FlatList } from 'react-native';
import { colors, fonts } from '../../utils';
import { MyButton, MyCalendar, MyGap, MyHeader, MyInput, MyRadio } from '../../components';
import axios from 'axios';
import { apiURL, getData } from '../../utils/localStorage';
import { showMessage } from 'react-native-flash-message';
import moment from 'moment';
import { useIsFocused } from '@react-navigation/native';

export default function DataIbuHamil({ route, navigation }) {

    const handleBack = () => {
        navigation.goBack()
    }

    const [soal, setSoal] = useState([]);
    const [tipe, setTipe] = useState('ADD');
    const [isi, setIsi] = useState({});


    const sendServer = () => {
        console.log(soal[0].jawab);

        if (soal[0].jawab.length > 0) {

            let sql;
            if (tipe == 'ADD') {
                sql = `INSERT INTO data_hamil(

                fid_user,
                ${soal.map(i => {
                    return i.kolom
                })}
        
                ) VALUES(
                
                '${route.params.id}',
                ${soal.map(i => {
                    if (i.kolom == 'hpht') {
                        return `'${i.jawab.length > 0 ? i.jawab : moment().format('YYYY-MM-DD')}'`
                    } else {
                        return `'${i.jawab}'`
                    }
                })}
                
                )`;
            } else {
                sql = `UPDATE data_hamil SET

              
                ${soal.map(i => {
                    return `${i.kolom}='${i.jawab}'`
                })}
        
                WHERE fid_user='${route.params.id}'`;
            }
            console.log(sql);
            axios.post(apiURL + 'add_data', {
                sql: sql
            }).then(res => {
                console.log(res.data);
                showMessage({
                    type: 'success',
                    icon: 'success',
                    message: res.data.message
                });
                // navigation.navigate('Riwayat');
            })
        } else {
            showMessage({
                type: 'danger',
                icon: 'danger',
                message: 'Data Masih kosong !'
            })
        }
    }

    const isFocused = useIsFocused();

    useEffect(() => {

        __getSoal();
    }, [isFocused]); // Refresh notes when screen is focused




    const __getSoal = () => {
        axios.post(apiURL + 'get_kolom', {
            table: 'hamil'
        }).then(res => {

            getData('user').then(u => {
                axios.post(apiURL + 'riwayat_ibuhamil', {
                    fid_user: u.id
                }).then(res2 => {
                    console.log(res2.data);
                    if (res2.data.length > 0) {
                        setTipe('UPDATE');
                        setIsi(res2.data[0]);
                        let dataIsi = res2.data[0];
                        let tmp = [...res.data];
                        res.data.map((i, index) => {
                            tmp[index].jawab = dataIsi[i.kolom];
                        })

                        setSoal(tmp);
                    } else {
                        setTipe('ADD');
                        setSoal(res.data);
                    }
                    // setData(res.data);
                })
            })

        })
    }

    const [kirim, setKirim] = useState({
        fid_user: route.params.fid_user,
    })
    return (
        <View style={{ flex: 1, backgroundColor: colors.white }}>
            <MyHeader onPress={handleBack} title="Data Ibu Hamil" />
            <ScrollView >


                <FlatList data={soal} renderItem={({ item, index }) => {
                    return (
                        <>







                            {item.tipe !== 'date' &&
                                <View style={{
                                    marginHorizontal: 16,
                                    marginVertical: 8,
                                }}>
                                    <MyInput value={item.jawab} label={item.soal} onChangeText={x => {
                                        let tmp = [...soal];
                                        tmp[index].jawab = x;
                                        setSoal(tmp);
                                    }} />
                                </View>
                            }


                            {item.tipe == 'date' &&
                                <View style={{
                                    marginHorizontal: 16,
                                    marginVertical: 8,
                                }}>
                                    <MyCalendar value={item.jawab.length > 0 ? item.jawab : moment().format('YYYY-MM-DD')} label={item.soal} onDateChange={x => {
                                        let tmp = [...soal];
                                        tmp[index].jawab = x;
                                        setSoal(tmp);
                                    }} />
                                </View>
                            }





                        </>
                    )
                }} />

                <View style={{
                    padding: 10,
                }}>
                    <MyButton onPress={sendServer} title="Simpan" />
                    <MyGap jarak={10} />
                    {/* <MyButton warna={colors.secondary} onPress={() => navigation.navigate('Riwayat', route.params)} title="Riwayat" /> */}
                </View>
            </ScrollView>


        </View>
    );
}