import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default function Edit(props) {

    const movie = props.navigation.getParam('movie', null);
    const [ title, setTitle ] = useState(movie.title);
    const [ description, setDescription ] = useState(movie.description);

    const saveMovie = () => {

        if(movie.id) {
            fetch(`http://192.168.43.82:19000/api/movies/${movie.id}/`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Token 97ff16ffae4cbaa85b080110ab110e478da22fe4`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({title: title, description: description})
            })
            .then( res => res.json())
            .then( movie => {
                props.navigation.navigate("Detail", {movie: movie, title: movie.title, token: token})
            })
            .catch(error => console.log(error));
        } else {
            fetch(`http://192.168.43.82:19000/api/movies/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Token 97ff16ffae4cbaa85b080110ab110e478da22fe4`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({title: title, description: description})
            })
            .then( res => res.json())
            .then( movie => {
                props.navigation.navigate("MovieList")
            })
            .catch(error => console.log(error));
        }
    };


    return (
        <View style={styles.container}>
            <Text style={styles.label}>Title</Text>
            <TextInput
                style={styles.input}  
                placeholder="Title"
                onChangeText={text => setTitle(text) }
                value={title}
            />
            <Text style={styles.label}>Description</Text>
            <TextInput
                style={styles.input}  
                placeholder="Description"
                onChangeText={text => setDescription(text) }
                value={description}
            />
            <Button onPress={() => saveMovie()} title={movie.id ? "Edit" : "Add"} />
        </View>
    );
}

Edit.navigationOptions = screenProps => ({
    title: screenProps.navigation.getParam('title'),
    headerStyle: {
        backgroundColor: 'orange'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        fontWeight: 'bold',
        fontSize:  24
    },
    headerRight: () => (
        <Button title="Remove" color="black" 
            onPress={ () => removeClicked(screenProps)} 
        />
    )
})

const removeClicked = (props) => {
    const movie = props.navigation.getParam("movie")
    console.log(movie);
    fetch(`http://192.168.43.82:19000/api/movies/${movie.id}/`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Token 97ff16ffae4cbaa85b080110ab110e478da22fe4`,
                    'Content-Type': 'application/json'
                }
            })
            .then( res => {
                props.navigation.navigate("MovieList")
            })
            .catch(error => console.log(error));
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282C35',
    padding: 10
  },
  label:{
      fontSize: 24,
      color: 'white',
      padding: 10
  },
  input: {
      fontSize: 24,
      backgroundColor: '#fff',
      padding: 10,
      margin: 10
  }
});
