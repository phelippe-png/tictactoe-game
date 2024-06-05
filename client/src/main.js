import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, TextInput, KeyboardAvoidingView } from "react-native"
import Player from "./class/player"
import Bot from "./class/bot"
import { io } from "socket.io-client"
import { useEffect, useRef, useState } from "react"
import Modal from "react-native-modal"

const Main = ({navigation}) => {
  const nicknameRef = useRef('')
  const [modalMultiplayer, setModalMultiplayer] = useState(false)

  const soloMode = () => {
    const player = new Player('fitizao', false, 'x')
    const bot = new Bot('BOT', true, 'o')

    navigation.navigate('LayoutGame', {firstPlayer: player, secondPlayer: bot})
  }

  const multiplayerMode = (nickname) => {
    const socket = io('http://192.168.0.58:9000')

    socket.emit('player', new Player(nickname, false))
    navigation.navigate('LayoutGame', {socket: socket})
  }

  return(
    <View style={styles.container}>
      <TouchableOpacity style={styles.buttons} onPress={() => {soloMode()}}>
        <Text>UM JOGADOR</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttons} onPress={() => {setModalMultiplayer(true)}}>
        <Text>MULTIPLAYER</Text>
      </TouchableOpacity>
      <Modal 
        animationOutTiming={300} 
        isVisible={modalMultiplayer} 
        useNativeDriverForBackdrop 
        useNativeDriver
        style={{alignItems: 'center', justifyContent: 'center'}}
      >
        <View style={styles.modalMultiplayer}>
          <View style={{flex: 6.5, alignItems: 'center', paddingTop: 30}}>
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20, width: '85%'}}>NICKNAME</Text>
            <TextInput onChangeText={(e) => {nicknameRef.current = e}} style={styles.textInputModal} />
          </View>

          <View style={{flex: 6, alignItems: 'center', justifyContent: 'center',}}>
            <TouchableOpacity 
              style={[styles.buttonSubmitModal, {backgroundColor: 'orange',}]} onPress={() => {multiplayerMode(nicknameRef.current)}}
            >
              <Text style={{fontWeight: 'bold', fontSize: 25}}>ENTRAR</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.buttonSubmitModal, {backgroundColor: '#EE5545'}]} onPress={() => {setModalMultiplayer(false)}}
            >
              <Text style={{fontWeight: 'bold', fontSize: 25}}>CANCELAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },

  buttons: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange',
    width: 200, 
    height: 50,
    borderRadius: 5,
    margin: 5,
    borderColor: 'black',
    borderWidth: 0.5
  },

  modalMultiplayer: {
    width: '95%',
    height: '55%',
    borderRadius: 15,
    backgroundColor: '#454E56',
    elevation: 12
  },

  textInputModal: {
    width: '85%',
    height: 40,
    backgroundColor: 'white',
    borderRadius: 5,
    fontSize: 25,
    paddingLeft: 5,
  },

  buttonSubmitModal: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '85%',
    height: 50, 
    borderRadius: 5, 
    borderWidth: 0.5,
    elevation: 12,
    margin: 5
  }
})

export default Main