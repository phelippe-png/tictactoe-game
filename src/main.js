import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import Player from "./class/player"
import Bot from "./class/bot"

const Main = ({navigation}) => {
  const player = new Player('fitizao', false, 'x')
  const bot = new Bot('BOT', true, 'o')

  return(
    <View style={styles.container}>
      <TouchableOpacity style={{backgroundColor: 'green', width: 150, height: 30}} 
        onPress={() => {
          navigation.navigate('LayoutGame', {firstPlayer: player, secondPlayer: bot})
        }}>
        <Text>OPA</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  }
})

export default Main