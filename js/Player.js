class Player {
    constructor() {
      this.name = null;
      this.index = null;
      this.isButtonPressed = false;
      this.time = 0;
    }
  
    addPlayer() {
      var playerIndex = "players/player" + this.index;
  
      if (this.index === 1) {
        this.positionX = width / 2 - 100;
      } else {
        this.positionX = width / 2 + 100;
      }
  
      database.ref(playerIndex).set({
        name: this.name,
        isButtonPressed: false,
        time: 0,
      });
    }
  
    getCount() {
      var playerCountRef = database.ref("playerCount");
      playerCountRef.on("value", data => {
        playerCount = data.val();
      });
    }
  
    updateCount(count) {
      database.ref("/").update({
        playerCount: count
      });
    }
  
    update() {
      var playerIndex = "players/player" + this.index;
      database.ref(playerIndex).update({
        isButtonPressed: false,
        time: 0,
      });
    }
  
    static getPlayersInfo() {
      var playerInfoRef = database.ref("players");
      playerInfoRef.on("value", data => {
        allPlayers = data.val();
      });
    }
  }
  