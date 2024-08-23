import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ScrollView, TouchableNativeFeedback, Modal, TouchableOpacity, Image, FlatList } from 'react-native';
import { colors, fonts } from '../../utils';
import { MyButton, MyCalendar, MyHeader, MyInput, MyPicker, MyRadio } from '../../components';
import axios from 'axios';
import { apiURL } from '../../utils/localStorage';
import { showMessage } from 'react-native-flash-message';
import moment from 'moment';

export default function EditBersalin({ route, navigation }) {

    const ITEM = route.params.data;
    const ID = route.params.id;


    const handleBack = () => {
        navigation.goBack()
    }

    const [soal, setSoal] = useState([]);

    useEffect(() => {
        __getSoal();
    }, []);

    const sendServer = () => {
        console.log(soal[0].jawab);

        if (soal[0].jawab.length > 0) {

            let sql = `UPDATE data_ceknifas SET
            ${soal.map(i => {
                return `${i.kolom}='${i.jawab}'`
            })}
          
          WHERE id_ceknifas='${ID}'
          `;
            console.log(sql);
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
                navigation.goBack();
            })
        } else {
            showMessage({
                type: 'danger',
                icon: 'danger',
                message: 'Data Masih kosong !'
            })
        }
    }

    const __getSoal = () => {
        axios.post(apiURL + 'get_kolom', {
            table: 'ceknifas'
        }).then(res => {
            let TMP = [...res.data];
            console.log(TMP);
            res.data.map((i, index) => {
                TMP[index]['jawab'] = ITEM[i.kolom];

            })
            setSoal(TMP);

        })
    }

    const [kirim, setKirim] = useState({
        fid_user: route.params.fid_user,
    })
    return (
        <View style={{ flex: 1, backgroundColor: colors.white }}>
            <MyHeader onPress={handleBack} title="Edit Ibu Nifas" />
            <ScrollView >


                <FlatList data={soal} renderItem={({ item, index }) => {
                    return (
                        <>





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







                        </>
                    )
                }} />

                <View style={{
                    padding: 10,
                }}>
                    <MyButton onPress={sendServer} title="Simpan" />
                </View>
            </ScrollView>


        </View>
    );
}