var canvas;
var backgroundImage, player1_img, player2_img, track;
var fuelImage, powerCoinImage, lifeImage;
var obstacle1Image, obstacle2Image;
var database, gameState;
var form, player, playerCount;
var allPlayers, player1, player2, fuels, powerCoins, obstacles;
var blastImg;
var bullets, fireballs;
var players = [];
var weapons = [];
var weapon1, weapon2;

function preload() {
  backgroundImage = loadImage("./assets/background.png");
  player1_img = loadImage("./assets/tank.png");
  player2_img = loadImage("./assets/zombie.gif");
  bulletPack = loadImage("./assets/BulletPack.png")
  //track = loadImage("../assets/track.jpg");
  bulletImage = loadImage("./assets/bullet.png");
  fireballImage = loadImage("./assets/fireball.png");
  obstacle1Image = loadImage("./assets/hand.jpg");
  //obstacle2Image = loadImage("./assets/obstacle2.png");
  lifeImage = loadImage("./assets/life.png");
  blastImg = loadImage("./assets/blast.png");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}

function draw() {
  background(backgroundImage);
  if (playerCount === 2) {
    game.update(1);
  }

  if (gameState === 1) {
    game.play();
    for (var i = 0; i < players.length; i++) {
      if (i !== (player.index-1))
        weapons[player.index-1].collide(players[i], destroyChar);
        console.log(i,",",player.index)
      if (players[i].visible === false) {// player was hit by current player
        Player.updateLives(i+1);
        players[i].visible = true;
      }
    }
  }

  if (gameState === 2) {
    game.showLeaderboard();
    game.end();
  }

 
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function destroyChar(weapon,char) {
  console.log("char got attacked!")
  char.visible = false;
  //attacking players updates
  player.weaponx = -1000; player.weapony = -1000;
  game.weaponMovingDir = null;
  weapons[player.index-1].visible = false;
  weapon.x = -1000; weapon.y = -1000;
 
  player.update();
}