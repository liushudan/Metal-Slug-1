const GAME_WIDTH = 650;
const GAME_HEIGHT = 400;

class MetalSlug {
  constructor() {
    this.width = GAME_WIDTH;
    this.height = GAME_HEIGHT;
    this.gameUI = new GameUI();
    this.camera=new Camera();
    this.keys = [];
    this.sx = 0;
    this.sy = 0;
    this.bulletList=[];
  }

  init() {
    this.background = new Image();
    this.background.src = "images/background.jpg";
    this.character = new Character(this.camera.x);
    this.initialiseKeys();
    this.bindCanvasPress(this.keys);
    this.start();
  }

  start(){
    let animation= window.requestAnimationFrame(() => this.start());
    this.gameUI.clear(0, 0, this.width, this.height);
    this.renderBackground();
    this.character.drawCharacter(this.camera);
    if(this.keys[39]){
      //right arrow
      this.character.updateCharacter(1,0);
    }
    else if(this.keys[37]){
      //left arrow
      this.character.updateCharacter(-1,0);
    }
    else if(this.keys[38]){/*up arrow*/}
    else if(this.keys[40]){/*down arrow*/}
    else if(this.keys[32]){
      //space
      let bullet=new Bullet(this.character, this.camera);
      bullet.drawBullet();
      this.bulletList.push(bullet);
    }
    this.moveCamera();
    this.moveBullet();
  }

  renderBackground(){
    this.gameUI.canvasCtx.drawImage(this.background, this.sx+this.camera.x, this.sy, this.width,this.height, 0,0 ,GAME_WIDTH, GAME_HEIGHT);
  }

  moveCamera(){
    this.camera.update(this.gameUI.canvas,this.character);
  }

  moveBullet(){
    this.bulletList.forEach((bullet)=>{
      bullet.moveBullet();
    })
  }

  initialiseKeys(){
    for(let i =1;i<223;i++){
      this.keys.push(false);
    }
  }

  bindCanvasPress(keys){
    document.body.addEventListener( "keydown", function(e){
         keys[e.keyCode] = true;    
    }, true);
    document.body.addEventListener( "keyup", function(e){
      keys[e.keyCode] = false;
    }, true);
  }

}