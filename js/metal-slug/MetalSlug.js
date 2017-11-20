const GAME_WIDTH = 650;
const GAME_HEIGHT = 400;

class MetalSlug {
  constructor() {
    this.width = GAME_WIDTH;
    this.height = GAME_HEIGHT;
    this.gameUI = new GameUI();
    this.background = new Image();
    this.background.src = 'images/background.jpg';
    this.character=new Character(this.gameUI.canvasCtx);
  }

  init() {
    this.gameUI.canvasCtx.drawImage(this.background, 0, 0, this.width, this.height, 0, 0, this.width, this.height);
    this.character.drawCharacter();
  }
}