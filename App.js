/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Alert,
  Button
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class App extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      // state of game
      gameState: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
      // for current player
      currentPlayer: 1,
    }
  }

  componentDidMount(){
    this.initializeGame()
  }

  // Initialize the game function
  initializeGame = () => {
    this.setState({
      gameState: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
      currentPlayer: 1,
    })
  }

  // function to check the winner
  getWinner = () => {
    const NUM_TITLES = 3;
    var arr = this.state.gameState;
    var sum;

    // Check rows...
    for(var i  = 0; i < NUM_TITLES; i++){
      sum = arr[i][0] + arr[i][1] + arr[1][2];
      if (sum == 3){return 1;}
      else if (sum == -3){return -1;}
    }

    // check cols
    for (var i = 0; i < NUM_TITLES; i++){
      sum = arr[0][1] + arr[1][1] + arr[2][1];
      if (sum == 3){return 1;}
      else if (sum == -3){return -1;}
    }

    // diagonal check
    sum = arr[0][0] + arr[1][1] + arr[2][2]
    if (sum == 3){return 1;}
      else if (sum == -3){return -1;}


      sum = arr[2][0] + arr[1][1] + arr[0][2]
      if (sum == 3){return 1;}
        else if (sum == -3){return -1;}


        //No Winner

        return 0;
    }

  onTilePress = (row, col) => {
    // Don't allow tiles to change
    var value = this.state.gameState[row][col]
    if (value !== 0){return}

    // Grab current player
    var currentPlayer = this.state.currentPlayer;

    // set the current tile
    var arr = this.state.gameState.slice();
    arr[row][col] = currentPlayer;
    this.setState({gameState: arr});

    // switch to other player..
    var nextPlayer = (currentPlayer == 1) ? -1 : 1;
    this.setState({
      currentPlayer: nextPlayer
    })

    // check for winners

    var winners = this.getWinner();
    if(winners == 1){
      Alert.alert("Player 1 is the winner")
      this.initializeGame();
    }else if (winners == -1){
      Alert.alert("player 2 is the winner")
      this.initializeGame();
    }
  }

  onNewgamePress = () => {
    this.initializeGame()
  }

  renderIcon = (row, col) => {
    var value = this.state.gameState[row][col];
    switch(value)
    {
      case 1: return <Icon name = "md-bug" style ={styles.tileX}/>;
      case -1: return <Icon name = "md-checkmark-circle-outline" style ={styles.tileO}/>;
      default: return <View/>;
    }
  }

  render(){
  return (
  <View style={styles.container}>
    <View style = {{flexDirection: "row"}}>
      <TouchableOpacity onPress={()=> this.onTilePress(0, 0)} style={[styles.title, { borderLeftWidth: 0, borderTopWidth: 0}]}>
        {this.renderIcon(0, 0)}
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> this.onTilePress(0, 1)} style={[styles.title, { borderTopWidth: 0}]}>
      {this.renderIcon(0, 1)}
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> this.onTilePress(0, 2)} style={[styles.title, { borderTopWidth: 0, borderRightWidth: 0}]}>
      {this.renderIcon(0, 2)}
      </TouchableOpacity>
    </View>

    <View style={{flexDirection: "row"}}>
      <TouchableOpacity onPress={()=> this.onTilePress(1, 0)} style={[styles.title, {borderLeftWidth: 0,}]}>
      {this.renderIcon(1, 0)}
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> this.onTilePress(1, 1)} style={[styles.title, {}]}>
      {this.renderIcon(1, 1)}
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> this.onTilePress(1, 2)} style={[styles.title, {borderRightWidth: 0,}]}>
      {this.renderIcon(1, 2)}
      </TouchableOpacity>
    </View>

    <View style={{flexDirection: "row"}}>
      <TouchableOpacity onPress={()=> this.onTilePress(2, 0)} style={[styles.title, {borderBottomWidth: 0, borderLeftWidth: 0,}]}>
      {this.renderIcon(2, 0)}
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> this.onTilePress(2, 1)} style={[styles.title, {borderBottomWidth: 0,}]}>
      {this.renderIcon(2, 1)}
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> this.onTilePress(2, 2)} style={[styles.title, {borderBottomWidth: 0, borderRightWidth: 0}]}>
      {this.renderIcon(2, 2)}
      </TouchableOpacity>
    </View>
    <View style = {{paddingTop: 50}}>
    <Button style={{width: "100%", borderRaduis: 8}} title = "New Game" onPress={this.onNewgamePress}/>
    </View>
  </View>
  );
          }
};

const styles = StyleSheet.create({
    container: {
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
      flex: 1
    },

    title: {
      borderWidth: 10,
      borderColor: "green",
      width: 100,
      height: 100
    },

    tileX: {
      color: "red",
      fontSize: 60,
    },

    tileO: {
      color: "green",
      fontSize: 60,
    }
});

export default App;
