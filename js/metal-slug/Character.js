const CHARACTER_WIDTH = 36;
const CHARACTER_HEIGHT = 50;
const CHARACTER_START_POSITION_LEFT = 100;
const CHARACTER_START_POSITION_TOP = -50;
const MINIMUM_LEFT=20;
const MAXIMUM_LEFT=245;
const MAXIMUM_TOP=150;

class Character {
  constructor(context) {
    this.characterX = CHARACTER_START_POSITION_LEFT;
    this.characterY = CHARACTER_START_POSITION_TOP;
    this.characterWidth=CHARACTER_WIDTH;
    this.characterHeight=CHARACTER_HEIGHT;
    this.characterDX = 0;
    this.characterDY = 0;
    this.characterSpriteX=0;
    this.characterCtx = context;
    this.characterImage = new Image();
    this.characterImage.src = 'images/character-sprite.png';
    this.drawCharacter();
  }

  drawCharacter() {
    this.characterCtx.drawImage(this.characterImage, this.characterSpriteX, 0, this.characterWidth, this.characterHeight, 100, 250, this.characterWidth, this.characterHeight);
    this.characterSpriteX+=36;
  }

  moveCharacter(positionX, positionY) {
    this.characterDX = positionX;
    this.characterDY = positionY;
    this.characterX += this.characterDX;
    this.characterY += this.characterDY;
    this.restrictCharacter();
    this.drawCharacter();
  }

  restrictCharacter(){
    if(this.characterX<=MINIMUM_LEFT){
      this.characterX=MINIMUM_LEFT;
    }

    if(this.characterX>=MAXIMUM_LEFT){
      this.characterX=MAXIMUM_LEFT;
    }

    if(this.characterY>MAXIMUM_TOP){
      this.characterY=MAXIMUM_TOP;
    }
  }
}