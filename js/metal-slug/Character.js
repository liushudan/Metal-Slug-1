const SPRITE_WIDTH=650;
const SPRITE_SIZE=50;
const SPRITE_RUNNING_RIGHT=100;
const SPRITE_RUNNING_LEFT=150;
const SPRITE_OFFSET=10;

class Character {
  constructor() {
    this.gameUI = new GameUI();
    this.sx = 0;
    this.sy = 0;
    this.height = SPRITE_SIZE;
    this.width = SPRITE_SIZE;
    this.x = 100;
    this.y = 0;
    this.minBoundary = 10;
    this.character = new Image();
    this.character.src = "images/character-sprite.png";
    this.planeY = 250; // where to land in the background
    this.move = 4;
    this.frame = 0;
    this.inAir = true;
    this.initalMovement = false;
    this.moveCharacter = true;
    this.turnLeft=false;
  }

  drawCharacter(camera) {
    this.checkBoundary();
    this.gameUI.canvasCtx.drawImage(this.character, this.sx, this.sy, this.width, this.height, this.x-camera.x, this.y, this.width * 2, this.height * 2);
    if (this.inAir) {
      if (this.y == this.planeY) {
        this.inAir = false;
        this.initalMovement = true;
      }
      this.y++;
    }
  }

  updateCharacter(dx, dy) {
    if (this.initalMovement) {
      this.frame++;
      if (this.frame > 2) {
        this.sx += SPRITE_SIZE;
        if (this.sx > SPRITE_WIDTH-SPRITE_OFFSET) {
          this.sx = 0;
        }

        if (dx > 0 && this.moveCharacter) {
          //move right
          this.x += this.move;
          this.sy = SPRITE_RUNNING_RIGHT;
          this.turnLeft=false;
        }
        else if (dx < 0 && this.moveCharacter) {
          //move left
          this.x -= this.move;
          this.sy = SPRITE_RUNNING_LEFT;
          this.turnLeft=true;
        }

        this.frame = 0;
      }
    }
  }

  checkBoundary() {
    if (this.x < this.minBoundary) {
      this.x = this.minBoundary;
    }
  }

  setBoundaryX(x) {
    this.minBoundary = x;
  }
}