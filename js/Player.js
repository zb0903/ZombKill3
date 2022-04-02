class Player {
  constructor() {
    this.name = null;
    this.index = null;
    this.positionX = 0;
    this.positionY = 0;
    this.rank = 0;
    this.bullets = 5;
    this.life = 3;
    this.fireballs = 5;
  }

  addPlayer() {
    var playerIndex = "players/player" + this.index;

    if (this.index === 1) {
      this.positionX = 10;
      this.positionY = height/2
    } else {
      this.positionX = width-10;
      this.positionY = height/2; 
    }

    database.ref(playerIndex).set({
      name: this.name,
      positionX: this.positionX,
      positionY: this.positionY,
      bullets: this.bullets,
      fireballs: this.fireballs,
      life: this.life
      //rank: this.rank,
      //score: this.score
    });
  }

  getDistance() {
    var playerDistanceRef = database.ref("players/player" + this.index);
    playerDistanceRef.on("value", data => {
      var data = data.val();
      this.positionX = data.positionX;
      this.positionY = data.positionY;
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
      positionX: this.positionX,
      positionY: this.positionY,
      //rank: this.rank,
      bullets: this.bullets,
      fireballs: this.fireballs,
      life: this.life
    });
  }

  static getPlayersInfo() {
    var playerInfoRef = database.ref("players");
    playerInfoRef.on("value", data => {
      allPlayers = data.val();
    });
  }

  getCarsAtEnd() {
    database.ref("carsAtEnd").on("value", data => {
      this.rank = data.val();
    });
  }

  static updateCarsAtEnd(rank) {
    database.ref("/").update({
      carsAtEnd: rank
    });
  }
  static async updateLives(index) {
    var playerIndex = "players/player" + index+"/lives";
    var livesCount = 0;
    var tmpRef = await database.ref(playerIndex).once("value");
    if (tmpRef.exists())  livesCount = tmpRef.val();

    livesCount--;
    
    //console.log(livesCount)
    database.ref("players/player"+index).update({
      lives:livesCount,
      positionY : height-100
    });

    if (livesCount <= 0) {game.gameOver();}
  }
  getLives() {
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).on("value", (data)=>{
      this.lives = data.val().lives;
    })
  }
}




