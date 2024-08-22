import { ActivityIndicator, FlatList, Image, Linking, SafeAreaView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MyDimensi, colors, fonts, windowHeight, windowWidth } from '../../utils'
import { Icon } from 'react-native-elements';
import YoutubePlayer from "react-native-youtube-iframe";
import axios from 'axios';
import { apiURL } from '../../utils/localStorage';
import moment from 'moment';
import { MyHeader } from '../../components';

export default function VideoMateri({ navigation, route }) {
  const item = route.params;
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const getDataTransaksi = () => {
    setLoading(true);
    axios.post(apiURL + 'youtube').then(res => {
      console.log(res.data[0]);
      setData(res.data[0]);
    }).finally(() => {
      setLoading(false)
    })
  }

  useEffect(() => {
    getDataTransaksi();
  }, []);

  const __renderItem = ({ item }) => {
    return (
      <TouchableWithoutFeedback onPress={() => {
        navigation.navigate('VideoDetail', item)
      }}>
        <View style={{
          flex: 1,
          margin: 10,
          // width: '100%',
          position: 'relative',
          borderRadius: 12,
          overflow: 'hidden'
        }}>
          <Image
            source={{ uri: item.image }}
            style={{
              // resizeMode: 'contain',
              height: 220,
              width: '100%',
            }}
          />
          <View style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            padding: 10,
            backgroundColor: colors.myback2
          }}>
            <Text style={{
              fontFamily: fonts.secondary[600],
              color: colors.white,
              fontSize: 20,
            }}>{item.judul}</Text>

          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  const [key, setKey] = useState('');
  const [TMP, setTMP] = useState({});

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: colors.white
    }}>

      <MyHeader title="Video Materi" onPress={() => navigation.goBack()} />
      {!loading &&
        <View style={{
          flex: 1,
        }}>

          <YoutubePlayer
            height={250}
            videoId={data.link}
            webViewProps={{
              injectedJavaScript: `
                  var element = document.getElementsByClassName('container')[0];
                  element.style.position = 'unset';
                  element.style.paddingBottom = 'unset';
                  true;
                `,
            }}
          />

          <Text style={{
            margin: 10,
            fontFamily: fonts.secondary[600],
            fontSize: 20,
          }}>{data.judul}</Text>

        </View>
      }
      {loading &&
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <ActivityIndicator size="large" color={colors.primary} />

        </View>
      }



    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})