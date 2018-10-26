import React, { Component } from 'react';
import {Text, View, Image, ScrollView, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import firebase  from 'firebase';


export default class Nota extends Component {
    
    state = {
        nome : this.props.navigation.state.params.item.nome,
        conteudo: this.props.navigation.state.params.item.conteudo
    }
    
    salvar = async () => {
        var nota = firebase.database();
        nota.ref('notas').child(this.props.navigation.state.params.item.id).set({
            nome: this.state.nome,
            conteudo: this.state.conteudo
        });
        
        this.props.navigation.navigate('Home');
    }
    remover = async () => {
        var nota = firebase.database();
        nota.ref('notas').child(this.props.navigation.state.params.item.id).remove()
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
                <View style={styles.boxBTNS}>
                <TouchableOpacity style={styles.boxAdd} onPress={this.salvar} >
                    <Text style={styles.txtAdd}>Salvar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.boxAdd} onPress={this.remover} >
                    <Text style={styles.txtAdd}>Excluir</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.boxAdd} onPress={() => {this.props.navigation.navigate('Home')}} >
                    <Text style={styles.txtAdd}>Voltar</Text>
                </TouchableOpacity>
                </View>
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
    boxBTNS:{
        flexDirection:'row',
        alignContent:'space-between'
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
        marginRight:10
    },
    txtAdd:{
        color:'#fff',
        fontSize:18,
        fontWeight:'700',
    },

});
