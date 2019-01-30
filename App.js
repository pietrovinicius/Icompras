import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  TextInput,
  BackHandler,
  Alert,
} from 'react-native';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      key:"0",
      produto:"",
      quantidade:"",
      valor:"",
      flatData: [
        { key: '0', produto: '', quantidade:'', preco: '' },
      ]
    };
    this.addProduto = this.addProduto.bind(this);
    this.addQuantidade = this.addQuantidade.bind(this);
    this.addValor = this.addValor.bind(this);
    this.calculoADD = this.calculoADD.bind(this);
  }

  flatRender(item) {
    return (
      <Text style={styles.produtos}>{item.key}, {item.produto}, {item.quantidade}, {item.preco}</Text>
    );
  }
  addProduto(p){
      this.setState.produto = p;      
      console.log('=========PRODUTO ADD', p );      
  }
  addQuantidade(q){
      this.setState.quantidade = q;
      console.log('=========PRODUTO QNT', q );  
  }
  addValor(v){
      this.setState.valor = v;
      console.log(`=========PRODUTO VALOR ${this.state.valor} = `, v);
  }
  calculoADD(f){    
    //console.log(`=========Calculo ADD FlatList ${this.state.flatData.indexOf}`);    
    let data = this.state.flatData;    
    this.setState.flatData = {key:this.state.key, produto:this.state.produto, quantidade:this.state.quantidade, preco:this.state.preco};    
    console.log(`=============${this.state.flatData.length}`);
    /*Alert.alert(
      'Alerta',
      `FlatList ${flatData}`,
      [
        { text: 'Cancel'},{text: 'OK'},
      ],
      { cancelable: false }
    )*/
  }

  componentWillMount() {
    console.log("=================WillMount()");
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    console.log("=================WillUnMount()");
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => {
    console.log("=================Back()");
    Alert.alert(
      'Sair',
      'Deseja Sair do App?',
      [
        { text: 'Cancel', onPress: () => console.log('=============Cancel'), style: 'cancel' },
        {
          text: 'OK', onPress: (() => {
            BackHandler.exitApp();
            console.log('=========OK');
          })
        },
      ],
      { cancelable: false }
    )
    return true;
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.view1}>
          <Text>produto</Text>
          <Text>quantidade</Text>
          <Text>valor</Text>
          <Text>     </Text>
        </View>
        <View style={styles.view2}>
          <TextInput style={styles.input} onChangeText={this.addProduto} />
          <TextInput style={styles.input} onChangeText={this.addQuantidade}/>
          <TextInput style={styles.input} onChangeText={this.addValor} />
          <Button title="ADD" onPress={this.calculoADD}  />
        </View>
        <FlatList style={styles.flatList} 
          data={this.state.flatData}
          renderItem={({item})=>this.flatRender(item)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
  },
  view1: {
    width:'100%',
    flexDirection: 'row',
    backgroundColor: '#DDDDDD',
    justifyContent: 'space-around',
  },
  view2: {
    flexDirection: 'row',
    width:'100%',
    justifyContent: 'space-around',
    backgroundColor: '#DDDDDD',
  },
  produtos: {
    fontSize: 14,
    color: '#000000',
  },
  input: {
    width:'30%',
    fontSize: 14,
    backgroundColor: '#DDDDDD',
  },
  flatList:{
    backgroundColor: '#DDFFDD',    
    width:'100%'
  },
});
