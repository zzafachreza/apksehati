import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  Animated,
  ImageBackground,
  TouchableWithoutFeedback,
  TouchableOpacity,
  SafeAreaView,
  ScrollView
} from 'react-native';
import { MyButton, MyCalendar, MyGap, MyHeader, MyInput, MyPicker } from '../../components';
import { MyDimensi, colors, fonts, windowHeight, windowWidth, Color } from '../../utils';
import { MYAPP, apiURL, api_token, getData, storeData } from '../../utils/localStorage';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { color } from 'react-native-reanimated';
import axios from 'axios';
import moment from 'moment';
import { useToast } from 'react-native-toast-notifications';
import MyLoading from '../../components/MyLoading';
import MyCarouser from '../../components/MyCarouser';
import { Icon } from 'react-native-elements';


const MyMenu = ({ onPress, img, label, backgroundColor, desc }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
        width: windowWidth / 4,
        height: windowWidth / 4,
      }}>
        <View style={{
          backgroundColor: backgroundColor,
          borderRadius: 12,
          width: windowWidth / 4,
          height: windowWidth / 4,
          padding: 10,
          justifyContent: 'center',
          alignItems: 'center'

        }}>
          <Image source={img} style={{
            width: windowWidth / 5, height: windowWidth / 5,
          }} />
        </View>
        <Text style={{
          marginTop: 10,
          color: colors.black,
          ...fonts.caption,
          textAlign: 'center',
          maxWidth: '85%'
        }}>{label}</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default function Home({ navigation, route }) {
  const [user, setUser] = useState({});

  const __getUser = () => {
    getData('user').then(u => {
      setUser(u)
    })
  }

  useEffect(() => {
    __getUser();
  }, [])
  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: colors.white,
    }}>
    
    <ScrollView>



    <View style={{backgroundColor:colors.primary, padding:10, height:"30%", 
    borderBottomLeftRadius:30,  borderBottomRightRadius:30, justifyContent:'space-between'}}>

   <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:20}}>
   <View>
      <Text style={{fontFamily:fonts.primary[300], color:colors.white, fontSize:12}}>Selamat Datang!</Text>
      <Text style={{fontFamily:fonts.primary[600], color:colors.white, fontSize:20}}>Aplikasi Sehati</Text>
    </View>

    <View style={{justifyContent:"center", }}>
      <Image style={{width:43, height:43, }} source={require("../../assets/logo.png")}/>
    </View>

   </View>

   <View style={{alignItems:'center'}}>
    <Image style={{width:332, height:190, top:20}} source={require("../../assets/slider_1.png")}/>
   </View>
    </View>

    <View style={{padding:10, marginTop:'15%'}}>
      
      {/* DATA IBU */}
      <TouchableWithoutFeedback onPress={() => navigation.navigate("DataIbuHamil")}>
        <View style={{padding:10, backgroundColor:colors.primary, borderRadius:10,
        flexDirection:'row', justifyContent:'center'}}>
          <View style={{left:-20}}>
            <Image style={{width:56, height:56, }} source={require("../../assets/icon_dataibuhamil.png")}/>
          </View>

          <View style={{justifyContent:'center'}}>
            <Text style={{fontFamily:fonts.primary[600], color:colors.white, fontSize:22, }}>
              Data Ibu Hamil
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>

      {/* DATA HASIL PEMERIKSAAN */}
      <MyGap jarak={10}/>
      <TouchableWithoutFeedback onPress={() => navigation.navigate('DataPemeriksaanIbuHamil')}>
        <View style={{padding:10, backgroundColor:colors.primary, borderRadius:10,
        flexDirection:'row', justifyContent:'center'}}>
          <View style={{left:-30}}>
            <Image style={{width:56, height:56, }} source={require("../../assets/icon_datahasilpemeriksaan.png")}/>
          </View>
   
          <View style={{justifyContent:'center'}}>
            <Text style={{fontFamily:fonts.primary[600], color:colors.white, fontSize:22, left:-10}}>
              Data Hasil{'\n'}Pemeriksaan
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>

      {/* VIDEO MATERI */}
      <MyGap jarak={10}/>
      <TouchableWithoutFeedback onPress={() => navigation.navigate("VideoMateri")}>
        <View style={{padding:10, backgroundColor:colors.primary, borderRadius:10,
        flexDirection:'row', justifyContent:'center'}}>
          <View style={{left:-35}}>
            <Image style={{width:56, height:56, }} source={require("../../assets/icon_videomateri.png")}/>
          </View>
   
          <View style={{justifyContent:'center'}}>
            <Text style={{fontFamily:fonts.primary[600], color:colors.white, fontSize:22, left:-15}}>
              Video Materi
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>

            {/* TANYA JAWAB */}
            <MyGap jarak={10}/>
      <TouchableWithoutFeedback onPress={() => navigation.navigate("TanyaJawab")}>
        <View style={{padding:10, backgroundColor:colors.primary, borderRadius:10,
        flexDirection:'row', justifyContent:'center'}}>
          <View style={{left:-30}}>
            <Image style={{width:56, height:56, }} source={require("../../assets/icon_tanyajawab.png")}/>
          </View>
   
          <View style={{justifyContent:'center'}}>
            <Text style={{fontFamily:fonts.primary[600], color:colors.white, fontSize:22, left:-10}}>
              Tanya Jawab
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>


        {/* ARTIKEL */}
        <MyGap jarak={10}/>
      <TouchableWithoutFeedback onPress={() => navigation.navigate("Artikel")}>
        <View style={{padding:10, backgroundColor:colors.primary, borderRadius:10,
        flexDirection:'row', justifyContent:'center'}}>
          <View style={{left:-70}}>
            <Image style={{width:56, height:56, }} source={require("../../assets/icon_artikel.png")}/>
          </View>
   
          <View style={{justifyContent:'center'}}>
            <Text style={{fontFamily:fonts.primary[600], color:colors.white, fontSize:22, left:-20}}>
              Artikel
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>

         {/* KUESIONER */}
         <MyGap jarak={10}/>
      <TouchableWithoutFeedback onPress={() => navigation.navigate("Kuesioner")}>
        <View style={{padding:10, backgroundColor:colors.primary, borderRadius:10,
        flexDirection:'row', justifyContent:'center'}}>
          <View style={{left:-50}}>
            <Image style={{width:56, height:56, }} source={require("../../assets/icon_kuesioner.png")}/>
          </View>
   
          <View style={{justifyContent:'center'}}>
            <Text style={{fontFamily:fonts.primary[600], color:colors.white, fontSize:22, left:-20}}>
              Kuesioner
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
    </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})