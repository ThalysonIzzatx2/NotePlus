import React, { Component } from 'react';
import {Text, View, Image, ScrollView, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import firebase  from 'firebase';


export default class Criar extends Component {
    state = {
        nome :'',
        conteudo:'Digite a sua nota...',
    }
    
    salvar = async () => {
        var nota = firebase.database();
        nota.ref('notas').push().set({
            nome: this.state.nome,
            conteudo: this.state.conteudo
        });
        
        this.props.navigation.navigate('Home');
    }

    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.title}>Adicionar</Text>
                <TextInput style={styles.nome} placeholder="Titulo:"
                value={this.state.nome} onChangeText={nome => this.setState({nome})} />
                <TextInput style={styles.conteudo}
                value={this.state.conteudo} 
                onChangeText={conteudo => this.setState({conteudo})} 
                multiline={true}
                />
                <TouchableOpacity style={styles.boxAdd} onPress={this.salvar} >
                    <Text style={styles.txtAdd}>Salvar</Text>
                </TouchableOpacity>
            </View>
        );
    }

}
const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        flex:1,
        alignContent:'center',
        backgroundColor:'#039BE5',
        padding:20
    },
    title:{
        fontSize:20,
        fontWeight:'600',
        color:'#fff'
    },
    nome:{
        width:'90%',
        backgroundColor:'#fff',
        margin:15,
        borderRadius:5

    },
    conteudo:{
        width:'80%',
        height:'70%',
        backgroundColor:'#fff',
        margin:15,
        textAlign:'justify',
        textAlignVertical:'top',
        borderRadius:5
    },
    boxAdd:{
        alignSelf:'center',
        backgroundColor:'#0277BD',
        alignItems:'center',
        justifyContent:'center',
        width:100,
        height:50,
        borderRadius:5,

    },
    txtAdd:{
        color:'#fff',
        fontSize:18,
        fontWeight:'700',
    },

});
