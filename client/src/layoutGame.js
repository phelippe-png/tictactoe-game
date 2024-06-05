import React, { useEffect, useMemo, useRef, useState } from "react"
import { StyleSheet, View, TouchableOpacity, Text, SafeAreaView, Dimensions, TextComponent } from "react-native"
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { STYLE_BUTTONS, WIDTH_BUTTONS, HEIGHT_BUTTONS, SEQUENCES_WIN, X, O } from "./consts"

const LayoutGame = ({navigation, route}) => {
  const socket = useRef(route.params.socket)
  const symbol = useRef(X)

  const arrayRefs = useRef({})
  useEffect(() => {
    STYLE_BUTTONS.map((style, index) => {
      arrayRefs.current = {
        ...arrayRefs.current,
        [index]: React.createRef()
      }
    })
  }, [])

  const getSymbol = (symbol) => {
    if (symbol == 'x') return(<Ionicons name="close" size={100}></Ionicons>)
    else if (symbol == 'o') return(<FontAwesome name="circle-o" size={73}></FontAwesome>)
  }

  const [refresh, setRefresh] = useState(false)
  const clickedButtons = useRef([])
  const currentPlayer = useRef({})
  const arraySequence = useRef([])

  useEffect(() => {
    socket.on('return_player', player => {
      currentPlayer = player
    })
  }, [])

  console.log(currentPlayer)

  const renderButtons = () => {
    return(
      <View style={{flex: 1}}>
        <SafeAreaView style={{flex: 1.5, alignItems: "center", justifyContent: "center", flexDirection: 'row'}}>
          <View>
            <Text style={{fontSize: 35, fontWeight: 'bold'}}>{route.params.firstPlayer?.name}</Text>
            <Text style={{fontSize: 35, fontWeight: 'bold', textAlign: "right"}}>{route.params.firstPlayer?.points}</Text>
          </View>
          <Text style={{margin: 20}}>
            <Ionicons name="close-outline" size={70}></Ionicons>
          </Text>
          <View>
            <Text style={{fontSize: 35, fontWeight: 'bold'}}>{route.params.secondPlayer?.name}</Text>
            <Text style={{fontSize: 35, fontWeight: 'bold', textAlign: "left"}}>{route.params.secondPlayer?.points}</Text>
          </View>
        </SafeAreaView>

        <SafeAreaView style={{flex: 3, alignItems: "center", justifyContent: "center", flexDirection: "row", flexWrap: "wrap"}}>
          {
            STYLE_BUTTONS.map((style, index) => (
              <Text key={index} onPress={(e) => {executeButton(index, arrayRefs.current[index])}} style={[styles.buttons, style]}>
                {getSymbol(arrayRefs.current[index]?.current)}
              </Text>
            ))
          }
        </SafeAreaView>
      </View>
    )
  }

  const executeButton = (buttonIndex, refButton) => {
    if (clickedButtons.current.find((e) => e == 'button-'+buttonIndex))
      return null

    currentPlayer.current?.clickedButtons.push(buttonIndex)
    refButton.current = currentPlayer.current.symbol

    verifySequence(arraySequence)

    if (arraySequence.current?.length == 3) {
      currentPlayer.current?.incrementPoint();

      clickedButtons.current = ([...clickedButtons.current, 'button-'+buttonIndex])
      setRefresh(!refresh)
      return null
    }

    currentPlayer.current = route.params.firstPlayer?.symbol == currentPlayer.current.symbol ? route.params.secondPlayer : route.params.firstPlayer
    clickedButtons.current = ([...clickedButtons.current, 'button-'+buttonIndex])

    setRefresh(!refresh)
  }

  useEffect(() => {
    if (arraySequence.current?.length == 3 || clickedButtons.current.length == STYLE_BUTTONS.length) {
      currentPlayer.current.clickedButtons = [];     
      route.params.firstPlayer.clickedButtons = [];
      route.params.secondPlayer.clickedButtons = [];

      arraySequence.current = []

      clickedButtons.current.map((e) => {
        arrayRefs.current[e.replace('button-', '')].current = ''
      })

      clickedButtons.current = []

      setTimeout(() => {
        setRefresh(!refresh)
      }, 500);
    }

    if (currentPlayer.current?.isBot)
      setTimeout(() => {
        executeBot()
      }, 300);
  }, [refresh])

  const executeBot = () => {
    var index = Math.floor(Math.random() * STYLE_BUTTONS.length)
    while (clickedButtons.current.find((e) => e == 'button-'+index) && clickedButtons.current.length < STYLE_BUTTONS.length) 
      index = Math.floor(Math.random() * STYLE_BUTTONS.length)

    executeButton(index, arrayRefs.current[index])
  }

  const verifySequence = (refSeq) => {
    SEQUENCES_WIN.map((seq) => {
      let array = []
      currentPlayer.current?.clickedButtons.map((i) => {
        if (seq.includes(i)) array.push(i)
      })

      if (array.length == 3)
        refSeq.current = seq
    })
  }

  return(
    <View style={styles.container}>
      {renderButtons()}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'orange'
  },

  buttons: {
    width: WIDTH_BUTTONS, 
    height: HEIGHT_BUTTONS,
    margin: -0.1,
    textAlign: 'center',
    textAlignVertical: 'center'
  }
})

export default LayoutGame