import React, { Component } from 'react'
import { render } from 'react-dom';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    View,
    SafeAreaView,
    TextInput,
    Button,
    FlatList,
    ActivityIndicator,
} from 'react-native'
import axios from "axios";

function LoadingIndicator(props) {
    if (!props.loading) {
      return null;
    }
  
    return (
      <ActivityIndicator/>
    );
  }

class Rate extends React.Component {
    state = {
        username: "",
        artist: "",
        song: "",
        rating: 0,
        cardData: [],
        loading:false,
    }

    onSubmit = () => {
        if(this.state.username == ""){
            alert("Please enter a username!");
            return;
        }
        if(this.state.artist == ""){
            alert("Please enter an artist!");
            return;
        }
        if(this.state.song == ""){
            alert("Please enter a song!");
            return;
        }
        if(this.state.rating < 1 || this.state.rating > 5){
            alert("Please enter a valid rating between 1-5!");
            return;
        }

        const formData = new FormData();
        formData.append('username', this.state.username);
        formData.append('songname', this.state.song);
        formData.append('artistname', this.state.artist);
        formData.append('rating', this.state.rating);

        axios.post("http://musicr8r.herokuapp.com/rate/", formData)
            .then(() => this.refreshCards())
            .catch(() => alert("Whoops! Try using an existing user, and make sure you filled out all fields!"));

    }

    componentDidMount() {
        this.refreshCards();
    }

    refreshCards() {
        this.setState({loading:true});
        fetch('http://musicr8r.herokuapp.com/getallsongs/', {
            method: 'GET'
        }).then((response) => response.json()).then((json) => this.setState({ cardData: json, loading:false})).catch((error) => console.error(error));
    }

    onDelete(pk){
        const formData = new FormData();
        formData.append('song', pk);
        axios.post('http://musicr8r.herokuapp.com/deletesong/', formData).then(() => this.refreshCards());
    }

    renderSongCard = (card) => {
        return (
            <View style={styles.card}>
                <Text>{card.item.pk}</Text>
                <Text>by {card.item.fields.artist}</Text>
                <Text>{card.item.fields.avgrating}/5⭐</Text>
                <Button
                    onPress={() => this.onDelete(card.item.pk)}
                    title="DELETE"
                    color="#ff3b30"
                />
            </View>
        )
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>MusicRater!</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    onChangeText={(text) => { this.setState({ username: text }) }}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Artist"
                    onChangeText={(text) => { this.setState({ artist: text }) }}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Song"
                    onChangeText={(text) => { this.setState({ song: text }) }}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Rating (1-5)"
                    onChangeText={(text) => { this.setState({ rating: text }) }}
                    keyboardType="numeric"
                />

                <Button
                    onPress={this.onSubmit}
                    title="Submit"
                    style={styles.submitbutton}
                />
                
                <LoadingIndicator loading={this.state.loading}/>
                <FlatList data={this.state.cardData} renderItem={this.renderSongCard} keyExtractor={card => card.pk} style={styles.list}/>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    list:{
        width:150,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        margin: 5,
        height: 40,
        width: 175,
        borderColor: '#5ac8fa',
        borderWidth: 1,
        borderRadius:5,
        padding:10,
    },
    submitbutton:{
        backgroundColor: '#5ac8fa',
        color:"#5ac8fa",
    },
    card: {
        margin: 5,
        backgroundColor: '#5ac8fa',
        padding: 5,
        borderRadius: 5,
        shadowRadius: 1,
        shadowOpacity: 0.4,

        shadowOffset: {
            width: 2,
            height: 2,
        },

    },
    title:{
        fontSize:36,
    },
});

export default Rate;