import Player from "./player";

class Bot extends Player {
  constructor(name, isBot, symbol){
    super(name, isBot, symbol)
  }

  botLogic() {
    return 0
  }
}

export default Bot