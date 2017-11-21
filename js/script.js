const KEY_CODES = {
  SPACE: 32,
  CTRL: 17,
  UP: 38,
  DOWN: 40,
  LEFT: 37,
  RIGHT: 39,
};
const SCREEN_MOVEMENT = 5;

let TileMap={
  ROWS:8,
  COLUMNS:10,
  TILESIZE:50,
  LAYERS: [[
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0
  ]]
};
class Game {
  constructor() {
    this.canvas = document.getElementById('game');
    this.ctx = this.canvas.getContext('2d');
    this.backgroundObj = new Background(this.ctx);
    this.character = new Character(this.ctx);
  }

  startGame() {
    this.setControls();
    setInterval(() => {
      this.backgroundObj.drawBackground();
      this.character.moveCharacter(0, 1);

      if(this.character.characterX===245){
        this.backgroundObj.updateBackground(SCREEN_MOVEMENT);
      }

    }, 15);
  }

  setControls() {
    document.onkeydown = (event) => {
      if (event.keyCode === KEY_CODES.LEFT) {
        this.character.moveCharacter(SCREEN_MOVEMENT * -1, 0);
      }
      if (event.keyCode === KEY_CODES.RIGHT) {
        this.character.moveCharacter(SCREEN_MOVEMENT, 0);
      }
      if (event.keyCode === KEY_CODES.DOWN) {
      }
      if (event.keyCode === KEY_CODES.SPACE || event.keyCode === KEY_CODES.UP) {
      }
      if (event.keyCode === KEY_CODES.CTRL) {
      }
    }
  }

}

let game = new Game();
game.startGame();