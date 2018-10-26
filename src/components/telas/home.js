import React, { Component } from 'react';
import {Text, View, Image, ScrollView, Icon, TextInput , TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import {createBottomTabNavigator} from 'react-navigation';
import firebase from 'firebase';
const teste = [];
export default class Home extends Component {

    state = {
        notas: [],
        text: '',
        data: [],
    }

    componentWillMount(){ 
        var db = firebase.database().ref('notas');
        db.on('value', (snapshot) => {
            var notas2 = [];
            snapshot.forEach((child) => {
                notas2.push({
                    id: child.key,
                    title: child.val().key,
                    nome: child.val().nome,
                    conteudo: child.val().conteudo
                })
            });  
            this.setState({notas: notas2, data: notas2});
            
        });
    }

    Search = text => {
        const nData = this.state.notas.filter(nota => {
            const Nota = nota.nome.toUpperCase()
            const TextData = text.toUpperCase()
            return Nota.indexOf(TextData) > -1
        })
        this.setState({
            data: nData,
            text: text
        })

    }

    render() {
        return(
            <View style={styles.container}> 
            <TextInput style={styles.inputSearch} placeholder="Search..." value={this.state.text} onChangeText={(text) => this.Search(text)} />
            <FlatList data={this.state.data}
            keyExtractor={item => item.id} 
            renderItem = {({item}) => (
                <ScrollView>
                    <TouchableOpacity style={styles.boxNota} onPress={() => {this.props.navigation.navigate('Nota', {item})}} >
                        <Text style={styles.titleNote}>{item.nome}</Text>
                    </TouchableOpacity>
                </ScrollView>
        )} />
            <View style={[styles.bot, {flexDirection:'row'} ]}>
                <TouchableOpacity style={styles.boxAdd} onPress={() => {this.props.navigation.navigate('Criar')}} >
                    <Text style={styles.txtAdd}>+</Text>
                </TouchableOpacity>

            </View>
            </View>
        );
    }

}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#039BE5',
        padding:20,
        justifyContent:'space-evenly'
    },
    inputSearch:{
        alignSelf:'center',
        backgroundColor:'#fff',
        width:'95%',
        borderRadius:5,
        
    },
    boxAdd:{
        alignSelf:'center',
        backgroundColor:'#0277BD',
        alignItems:'center',
        justifyContent:'center',
        width:50,
        height:50,
        borderRadius:20,

    },
    boxAtt:{
        alignSelf:'flex-end',
        backgroundColor:'#0277BD',
        alignItems:'center',
        justifyContent:'center',
        width:50,
        height:50,
        borderRadius:20,

    },
    txtAdd:{
        color:'#fff',
        fontSize:18,
        fontWeight:'700',
    },
    bot:{

    },
    boxNota:{
        backgroundColor:'#0288D1',
        width:'85%',
        height:50,
        borderRadius:10,
        margin:15,
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center'
    },
    titleNote:{
        color:'#fff'
    },



});
