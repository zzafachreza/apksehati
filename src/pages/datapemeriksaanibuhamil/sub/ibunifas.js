import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ScrollView, TouchableNativeFeedback, Modal, TouchableOpacity, Image, FlatList } from 'react-native';
import { colors, fonts } from '../../../utils';
import { MyButton, MyCalendar, MyHeader, MyInput, MyPicker, MyRadio } from '../../../components';
import axios from 'axios';
import { apiURL } from '../../../utils/localStorage';
import { showMessage } from 'react-native-flash-message';
import moment from 'moment';

export default function IbuBersalin({ route, navigation }) {

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

      let sql = `INSERT INTO data_ceknifas(

              fid_user,
              ${soal.map(i => {
        return i.kolom
      })}
      
            ) VALUES(
             
              '${route.params.id}',
              ${soal.map(i => {
        return `'${i.jawab}'`
      })}
            
            )`;
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
      console.log(res.data);
      setSoal(res.data);

    })
  }

  const [kirim, setKirim] = useState({
    fid_user: route.params.fid_user,
  })
  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <MyHeader onPress={handleBack} title="Ibu Nifas" />
      <ScrollView >
        <Text style={{
          marginTop: 10,
          fontFamily: fonts.primary[400], textAlign: "center", color: colors.tekscolor
          , fontSize: 16
        }}>(6 jam - sampai 42 hari setelah bersalin)</Text>

        <FlatList data={soal} renderItem={({ item, index }) => {
          return (
            <>




              {item.kolom == 'kf' &&

                <View style={{
                  marginHorizontal: 16,
                  marginVertical: 8,
                }}>
                  <MyPicker label="KF " data={[
                    { label: 'Pilih KF', value: '' },
                    { label: 'KF 1 (6 - 48 jam)', value: 'KF 1 (6 - 48 jam)' },
                    { label: 'KF 2 (3 - 7 hari)', value: 'KF 2 (3 - 7 hari)' },
                    { label: 'KF 3 (8 - 28 hari)', value: 'KF 3 (8 - 28 hari)' },
                    { label: 'KF 4 (29 - 42 hari)', value: 'KF 4 (29 - 42 hari)' },
                  ]}

                    value={item.jawab}
                    onValueChange={x => {
                      let tmp = [...soal];
                      tmp[index].jawab = x;
                      setSoal(tmp);
                    }}
                  />
                </View>
              }


              {item.tipe !== 'date' && item.kolom !== 'kf' &&
                <View style={{
                  marginHorizontal: 16,
                  marginVertical: 8,
                }}>
                  <MyInput label={item.soal} onChangeText={x => {
                    let tmp = [...soal];
                    tmp[index].jawab = x;
                    setSoal(tmp);
                  }} />
                </View>
              }


              {item.kolom == 'sifilis' &&

                <Text style={{
                  fontFamily: fonts.secondary[600],
                  fontSize: 14,
                  marginTop: 20,
                  marginHorizontal: 18,
                  color: colors.primary,
                }}>Hasil Pemeriksaan Triple Elminiasi :</Text>
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
        </View>
      </ScrollView>


    </View>
  );
}