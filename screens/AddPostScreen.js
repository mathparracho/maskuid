import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, Button } from 'react-native';
import { InputField, InputWrapper, SubmitBtn, SubmitBtnText } from '../styles/AddPost.js';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import { InterstitialAd, AdEventType } from 'react-native-google-mobile-ads';

const interstitial = InterstitialAd.createForAdRequest("ca-app-pub-7346272713414603/9721342385")

export const AddPostScreen = () => {
  const navigation = useNavigation();

  const [loaded, setLoaded] = useState(false);
  const [post, setPost] = useState("");
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
      setLoaded(true);
    });

    // Start loading the interstitial straight away
    interstitial.load();

    // Unsubscribe from events on unmount
    return unsubscribe;
  }, []);



  //get coordinates
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert("Permissão para a localização negada");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  //submit post
  const submitPost = () => {
    const url = 'http://34.95.184.183:3001/post'; // URL do endpoint da API

    const data = {
      lat: location.coords.latitude,
      long: location.coords.longitude,
      message: post,
    };

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(result => {
        console.log('Post criado:', result);
        Alert.alert('Segredo postado com sucesso!', '', [
          { text: 'OK', onPress: () => navigation.navigate('Home') }, // Navegação para a tela 'Home'
        ]);
        interstitial.show();
        // Lógica adicional após a criação do post, se necessário
      })
      .catch(error => {
        console.error('Erro ao criar post:', error);
      });
  };

  return (
    <View style={styles.container}>
      <InputWrapper>
        <InputField
          placeholder="O que deseja desmascarar?"
          placeholderTextColor="#FBFAEE"
          multiline
          numberOfLines={4}
          value={post}
          onChangeText={(content) => setPost(content)}
        />
        <SubmitBtn onPress={submitPost}>
          <SubmitBtnText>Postar!</SubmitBtnText>
        </SubmitBtn>
      </InputWrapper>

      
      
      <BannerAd
        unitId={"ca-app-pub-7346272713414603/5756444583"}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
