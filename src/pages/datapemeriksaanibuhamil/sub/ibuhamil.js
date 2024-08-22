import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ScrollView, TouchableNativeFeedback, Modal, TouchableOpacity, Image, FlatList } from 'react-native';
import { colors, fonts } from '../../../utils';
import { MyButton, MyCalendar, MyHeader, MyInput, MyPicker, MyRadio } from '../../../components';
import axios from 'axios';
import { apiURL } from '../../../utils/localStorage';
import { showMessage } from 'react-native-flash-message';
import moment from 'moment';

export default function IbuHamil({ route, navigation }) {

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

      let sql = `INSERT INTO data_cekhamil(

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
      table: 'cekhamil'
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
      <MyHeader onPress={handleBack} title="Ibu Hamil" />
      <ScrollView >


        <FlatList data={soal} renderItem={({ item, index }) => {
          return (
            <>




              {item.kolom == 'trisemester' &&

                <View style={{
                  marginHorizontal: 16,
                  marginVertical: 8,
                }}>
                  <MyPicker label="Trisemester " data={[
                    { label: 'Pilih Trisemester ', value: '' },
                    { label: 'Trisemester  I', value: 'Trisemester  I' },
                    { label: 'Trisemester  II - 1', value: 'Trisemester  II - 1' },
                    { label: 'Trisemester  II - 2', value: 'Trisemester  II - 2' },
                    { label: 'Trisemester  III - 1', value: 'Trisemester  III - 1' },
                    { label: 'Trisemester  III - 2', value: 'Trisemester  III - 2' },
                    { label: 'Trisemester  III - 3', value: 'Trisemester  III - 3' },
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


              {item.tipe !== 'date' && item.kolom !== 'trisemester' &&
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