import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  Animated,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import { MyButton, MyGap } from '../../components';
import { MyDimensi, colors, fonts, windowHeight, windowWidth } from '../../utils';
import { MYAPP, getData } from '../../utils/localStorage';

export default function Splash({ navigation }) {
  const img = new Animated.Value(0.5);
  const textScale = new Animated.Value(0.5);
  const textOpacity = new Animated.Value(0);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(img, {
        toValue: 1,
        duration: 750,
        useNativeDriver: true,
      }),
      Animated.timing(textScale, {
        toValue: 1,
        duration: 750,
        useNativeDriver: true,
      }),
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 750,
        useNativeDriver: true,
      })
    ]).start();

  
    setTimeout(() => {
    getData('user').then(res => {
    if (!res) {
    navigation.replace('Login')
    } else {
     navigation.replace('MainApp')
     }
     })
    }, 1200);
  }, []);

  return (
    <SafeAreaView style={{
      flex: 1,
      padding: 0,
      backgroundColor: colors.white,
      justifyContent: 'center',
      position: 'relative'
    }}>

      <ImageBackground source={require("../../assets/bgsplash.png")} style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.tertiary,
        width: '100%',
        height: '100%'
      }}>

        <Animated.Image
          source={require('../../assets/logo.png')}
          resizeMode="contain"
          style={{
            transform: [{ scale: img }],
            width: windowWidth / 1.8,
            height: windowWidth / 1.8,  
            marginTop:'30%'

          }}
        />

        <Animated.Text style={{
          fontFamily: fonts.primary[600],
          transform: [{ scale: textScale }],
          opacity: textOpacity,
          fontSize: 24, // Adjust size as needed
          color: colors.tekscolor, // Adjust color as needed
          marginTop: 30 // Adjust margin as needed
        }}>
          SEHATI
        </Animated.Text>

        <Animated.Text style={{
          fontFamily: fonts.primary[600],
          transform: [{ scale: textScale }],
          opacity: textOpacity,
          fontSize: 15, // Adjust size as needed
          color: colors.tekscolor, // Adjust color as needed
          marginTop: 0 // Adjust margin as needed
        }}>
          Sehat Calon Buah Hati
        </Animated.Text>

        <ActivityIndicator style={{marginTop:50}} color={colors.tekscolor} size="small" />

      </ImageBackground>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
