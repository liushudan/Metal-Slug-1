const CAMERA_WIDTH = 650;
const CAMERA_HEIGHT = 400;

class Camera{
  constructor(){
    this.x = 0;
    this.y = 0;
    this.width = CAMERA_WIDTH;
    this.height = CAMERA_HEIGHT;
  }

  update(canvas, character){
    this.x=character.x-(canvas.width/8)>>0;
  }
}