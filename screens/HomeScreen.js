import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, FlatList, Alert, RefreshControl } from 'react-native';
import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Card, Time, Post, BottomPost, Likes, Container, TituloFeed } from '../styles/FeedStyles.js';
import * as Location from 'expo-location';
import moment from 'moment';
import 'moment/locale/pt-br';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

const BASE_URL = 'http://34.95.184.183:3001';

// Função para salvar o array no AsyncStorage
const saveArrayToAsyncStorage = async (key, array) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(array));
  } catch (error) {
    console.error('Error saving data to AsyncStorage:', error);
  }
};

// Função para carregar o array do AsyncStorage
const loadArrayFromAsyncStorage = async (key) => {
  try {
    const data = await AsyncStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading data from AsyncStorage:', error);
    return [];
  }
};

const PostItem = ({ post, handleLike, handleDislike, isLiked, isDisliked }) => {
  return (
    <Card>
      <Time>{moment(post.timestamp).fromNow()}</Time>
      <Post>{post.message}</Post>
      <BottomPost>
        <Likes>{post.dislikes}</Likes>
        <TouchableOpacity onPress={handleDislike}>
          <Ionicons
            name={isDisliked ? 'heart-dislike' : 'heart-dislike-outline'}
            size={24}
            color={isDisliked ? 'purple' : 'purple'}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLike}>
          <Ionicons
            name={isLiked ? 'heart' : 'heart-outline'}
            size={24}
            color={isLiked ? 'purple' : 'purple'}
          />
        </TouchableOpacity>
        <Likes>{post.likes}</Likes>
      </BottomPost>
      
    </Card>
    
  );
};

export const HomeScreen = () => {
  const [posts, setPosts] = useState([]);
  const [location, setLocation] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [likedPosts, setLikedPosts] = useState([]);
  const [dislikedPosts, setDislikedPosts] = useState([]);

  useEffect(() => {
    loadArrayFromAsyncStorage('likedPosts').then((data) => setLikedPosts(data));
    loadArrayFromAsyncStorage('dislikedPosts').then((data) => setDislikedPosts(data));
  }, []);

  const navigation = useNavigation();

  const updateDislikes = async (postId, newDislikes) => {
    try {
      const response = await fetch(`${BASE_URL}/post/dislikes/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dislikes: newDislikes }),
      });
  
      if (!response.ok) {
        console.log(response);
        Alert.alert('Erro ao atualizar os dislikes');
        throw new Error('Erro ao atualizar os dislikes');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro ao atualizar os dislikes');
    }
  };
  
  const handleDislike = (post) => {
    if (likedPosts.includes(post._id)) {
      // O usuário já deu like neste post, não permita dar dislike
      return;
    }
  
    const updatedPosts = [...posts];
    const index = updatedPosts.findIndex((p) => p._id === post._id);
    if (index >= 0) {
      const updatedPost = { ...updatedPosts[index] };
  
      if (dislikedPosts.includes(post._id)) {
        // O usuário já deu dislike neste post, remover o dislike
        updatedPost.dislikes -= 1;
        setDislikedPosts((prevDislikedPosts) => prevDislikedPosts.filter((postId) => postId !== post._id));
      } else {
        // O usuário ainda não deu dislike neste post, adicionar o dislike
        updatedPost.dislikes += 1;
        setDislikedPosts((prevDislikedPosts) => [...prevDislikedPosts, post._id]);

        // Certificar que o post não está na lista de likedPosts
        setLikedPosts((prevLikedPosts) => prevLikedPosts.filter((postId) => postId !== post._id));
        
      }
      // Atualizar os dislikes no servidor
      updateDislikes(post._id, updatedPost.dislikes);
      updatedPosts[index] = updatedPost;

      setPosts(updatedPosts);
    }
  };

  const handleLike = (post) => {
    if (dislikedPosts.includes(post._id)) {
      // O usuário já deu dislike neste post, não permita dar like
      return;
    }

    const updatedPosts = [...posts];
    const index = updatedPosts.findIndex((p) => p._id === post._id);
    if (index >= 0) {
      const updatedPost = { ...updatedPosts[index] };

      if (likedPosts.includes(post._id)) {
        // O usuário já deu like neste post, remover o like
        updatedPost.likes -= 1;
        setLikedPosts((prevLikedPosts) => prevLikedPosts.filter((postId) => postId !== post._id));
      } else {
        // O usuário ainda não deu like neste post, adicionar o like
        updatedPost.likes += 1;
        setLikedPosts((prevLikedPosts) => [...prevLikedPosts, post._id]);
        

        // Certificar que o post não está na lista de dislikedPosts
        setDislikedPosts((prevDislikedPosts) => prevDislikedPosts.filter((postId) => postId !== post._id));
        
      }

      // Atualizar os dislikes no servidor
      updateLikes(post._id, updatedPost.likes);

      updatedPosts[index] = updatedPost;
      setPosts(updatedPosts);
    }
  };

  const updateLikes = async (postId, newLikes) => {
    try {
      const response = await fetch(`${BASE_URL}/post/likes/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ likes: newLikes }),
      });

      if (!response.ok) {
        console.log(response);
        Alert.alert('Erro ao atualizar os likes');
        throw new Error('Erro ao atualizar os likes');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro ao atualizar os likes');
    }
  };

  // Obter coordenadas
  useEffect(() => {
    const getCoordinates = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão para a localização negada');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    };

    getCoordinates();
  }, []);

  // Obter posts
  const getPosts = useCallback(async () => {
    if (!location) {
      return;
    }

    const newPost = {
      lat: location.coords.latitude,
      long: location.coords.longitude,
    };

    try {
      const response = await fetch(`${BASE_URL}/post/getPosts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });

      if (!response.ok) {
        Alert.alert('Erro ao carregar posts');
        throw new Error('Erro ao carregar posts');
      }

      const result = await response.json();
      // Inverter os posts para a ordem mais recente primeiro
      setPosts(result.reverse());
    } catch (error) {
      console.error(error);
      Alert.alert('Erro ao carregar posts');
    } finally {
      setRefreshing(false);
    }
  }, [location]);

  // Obter posts quando o componente for montado ou quando as coordenadas forem atualizadas
  useEffect(() => {
    getPosts();
  }, [location, getPosts]);

  const handleRefresh = () => {
    setRefreshing(true);
    getPosts();
  };

  useEffect(() => {
    // Função para salvar os arrays no AsyncStorage
    const saveData = async () => {
      saveArrayToAsyncStorage('likedPosts', likedPosts);
      saveArrayToAsyncStorage('dislikedPosts', dislikedPosts);
    };

    // Chamar a função de salvamento sempre que houver alterações nos arrays
    saveData();
  }, [likedPosts, dislikedPosts]);

  return (
    <View style={styles.container}>
      <Container>
      <TituloFeed>Segredos por perto:</TituloFeed>
      
      {posts.length === 0 ? (
        <View style={styles.noPosts}>
        <TituloFeed>Nenhum segredo ainda por perto...</TituloFeed>
        <TouchableOpacity onPress={getPosts}>
          <Ionicons name="refresh" size={30} color="white" />
        </TouchableOpacity>
      </View>
      ) : (
        <FlatList
          data={posts}
          renderItem={({ item }) => (
            <PostItem
              post={item}
              handleLike={() => handleLike(item)}
              handleDislike={() => handleDislike(item)}
              isLiked={likedPosts.includes(item._id)}
              isDisliked={dislikedPosts.includes(item._id)}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        />
      )}
      
      </Container>
      <BannerAd
      unitId={"ca-app-pub-7346272713414603/5756444583"}
      size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
    />


      <ActionButton buttonColor="#53118F" size={65} offsetX={17} offsetY={60}>
        <ActionButton.Item
          buttonColor="purple"
          title="Novo Segredo"
          onPress={() => navigation.navigate('AddPost')}
        >
          <Icon name="md-create" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#242424',
  },
  noPosts: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});

export default HomeScreen;
