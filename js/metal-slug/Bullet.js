const BULLET_WIDTH = 14;
const BULLET_HEIGHT = 8;

class Bullet {
  constructor(character,camera) {
    this.x = 0;
    this.y = 0;
    this.sx = 0;
    this.sy = 0;
    this.height = BULLET_HEIGHT;
    this.width = BULLET_WIDTH;
    this.bullet = new Image();
    this.bullet.src = 'images/bullet.png';
    this.gameUI = new GameUI();
    this.character=character;
    this.camera=camera;
    this.bulletLeft=this.character.turnLeft;
  }

  drawBullet() {
    if(this.x===0){
      if (this.character.turnLeft) {
        this.x += this.character.x - (this.camera.x-10);
        this.y = this.character.y+50;
      }
      else {
        this.x += (this.character.x + (1.5 * this.character.width)) - this.camera.x;
        this.y = this.character.y+50;
      }
    }
    this.gameUI.canvasCtx.drawImage(this.bullet, this.sx, this.sy, this.width, this.height, this.x, this.y, this.width, this.height);
  }

  moveBullet() {
    if (this.bulletLeft){
      this.x-=10;
    }
    else{
      this.x+=10;
    }
    this.drawBullet();
  }
}
