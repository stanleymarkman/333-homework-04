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
} from 'react-native'

class Rate extends React.Component {
    state = {
        username: "",
        artist: "",
        song: "",
        rating: 0,
        cardData: [],
    }

    onSubmit = () => {
        alert(this.state.username);
    }

    componentDidMount() {
        this.refreshCards();
    }

    refreshCards() {
        fetch('http://musicr8r.herokuapp.com/getallsongs/', {
            method: 'GET'
        }).then((response) => response.json()).then((json) => this.setState({ cardData: json })).catch((error) => console.error(error));
    }

    renderSongCard = (card) => {
        return (
            <View style={styles.card}>
                <Text>{card.item.pk}</Text>
                <Text>by {card.item.fields.artist}</Text>
                <Text>{card.item.fields.avgrating}/5⭐</Text>
                <Button
                    onPress={this.onSubmit}
                    title="DELETE"
                    color="#cc201b"
                />
            </View>
        )
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <FlatList data={this.state.cardData} renderItem={this.renderSongCard} keyExtractor={card => card.pk} />
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
                    color="#93A64F"
                />
                <Text>end</Text>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        margin: 5,
        height: 40,
        width: 100,
        borderColor: '#93A64F',
        borderWidth: 1
    },
    card:{
        margin:5,
        backgroundColor:'#37B49E',
        padding:5,
        borderRadius:5,
        shadowRadius:1,
        shadowOpacity:0.4,

        shadowOffset:{
            width:2,
            height:2,
        },

    },
});

export default Rate;