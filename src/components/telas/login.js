import React, { Component } from 'react';
import firebase from 'firebase';
import {Text, View, Image, ScrollView, StatusBar, TextInput, TouchableOpacity, StyleSheet} from 'react-native';

export default class Login extends Component {

    state = {
        email: '',
        senha:'',
        logged: 'false'
    }

    login = async () => {
        const {email, senha} = this.state;
        try {
        const user =  await firebase.auth().signInWithEmailAndPassword(email, senha);
        this.setState({logged:'true'});
        if(this.state.logged == 'true'){
            this.props.navigation.navigate('Home');
        }
        } catch(err) {
            alert(err);
        }
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                
                var uid = user.uid;
            } else {
              // No user is signed in.
            }
          });
    }
    cadastrar = async () => {
        const {email, senha} = this.state;
        try {
        const user =  await firebase.auth().createUserWithEmailAndPassword(email, senha);
        alert(user);
        
        } catch(err) {
            alert(err);
        }
    }
    anonimo = async () => {
        try {
            const user =  await firebase.auth().signInAnonymously();
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            this.props.navigation.navigate('Home');
        }catch(err){
             alert(err);
        }
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var isAnonymous = user.isAnonymous;
                var uid = user.uid;
            } else {
              // No user is signed in.
            }
          });
    }

    render() {
        return(
            <View style={styles.container}>
                <StatusBar backgroundColor="#29B6F6" />
                <Text style={styles.title}>Note Plus</Text>
                
                <TextInput style={styles.input} placeholder="Digite seu email" value={this.state.email} onChangeText={email => this.setState({email})} />
                <TextInput style={styles.input} placeholder="Digite sua senha" value={this.state.senha} onChangeText={senha => this.setState({senha})} />
                <View style={{flexDirection:'row'}}>
                    <TouchableOpacity style={styles.boxLog} onPress={this.login}>
                        <Text style={styles.txtLog}>Logar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.boxCad} onPress={this.cadastrar}>
                        <Text style={styles.txtCad}>Cadastrar</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={this.anonimo}>
                        <Text style={{color:'#fff', fontSize:15, fontWeight:'600'}}>Anônimo</Text>
                    </TouchableOpacity>
            </View>
        );
    }

}
const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        flex:1,
        justifyContent:'center',
        backgroundColor:'#039BE5',
        padding:20
    },
    title:{
        fontSize:45,
        fontWeight: '600',
        color: '#fff',
        
    },
    input:{
        backgroundColor:'#fff',
        alignSelf:'stretch',
        padding:15,
        marginTop:15,
        height:45,
        borderWidth:1,
        borderColor:'#EEE',
        color:'#636e72'

    },
    boxLog:{
        backgroundColor:'#0277BD',
        width:150,
        height:30,
        borderRadius: 5,
        alignItems:'center',
        justifyContent: 'center',
        margin:10,
        marginTop:15
    },
    boxCad:{
        backgroundColor:'#74b9ff',
        width:150,
        height:30,
        borderRadius: 5,
        alignItems:'center',
        justifyContent: 'center',
        margin:10,
        marginTop:15
    },
    txtLog:{
        color:'#fff',
        fontWeight:'400'
    },
    txtCad:{
        color:'#fff',
        fontWeight:'400'
    },
});
