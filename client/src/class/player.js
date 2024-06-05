class Player{
  constructor(name, isBot, symbol) {
    this.name = name
    this.isBot = isBot
    // this.symbol = symbol
    this.clickedButtons = []
    this.points = 0
  }

  incrementPoint() {
    this.points++
  }
}

export default Player