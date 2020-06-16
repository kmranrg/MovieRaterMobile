import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image, Button, TouchableOpacity } from 'react-native';

export default function MovieList(props) {

  const [ movies, setMovies ] = useState([]);

  useEffect(() => {
      fetch('http://192.168.43.82:19000/api/movies/', {
          method: 'GET',
          headers: {
              'Authorization': `Token 97ff16ffae4cbaa85b080110ab110e478da22fe4`
          }
      })
      .then( res => res.json())
      .then( jsonRes => setMovies(jsonRes))
      .catch( error => console.log(error));
  }, []); 

  const movieClicked = (movie) => {
    props.navigation.navigate("Detail", {movie: movie, title: movie.title})
  }

  return (
    <View>

      <Image source={require('../assets/mr_logo.png')}
        style={{width: '100%', height: 135, paddingTop: 30}}
        resizeMode="contain" />

      <FlatList 
          data={movies}
          renderItem={({item}) => (
              <TouchableOpacity onPress={() => movieClicked(item)}>
                <View style={styles.item} >
                  <Text style={styles.itemText}>{item.title}</Text>
                </View>
              </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString() }
      />
    </View>
  );
}

MovieList.navigationOptions = screenProps => ({
  title: "List of Movies",
  headerStyle: {
      backgroundColor: 'orange'
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
      fontWeight: 'bold',
      fontSize:  24
  },
  headerRight: () => (
      <Button title="Add New" color="black" 
          onPress={ () => screenProps.navigation.navigate("Edit", {movie: { title: '', description: '' } } )} 
      />
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    flex: 1,
    padding: 10,
    height: 50,
    backgroundColor: '#282C35'
  },
  itemText: {
      color: '#fff',
      fontSize: 24
  }
});
